import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Category} from 'src/app/core/models/admin/category/Category';
import {faTrash, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {CommonService} from 'src/app/shared/service/common/common.service';
import {MenuConstant} from 'src/app/core/constants/menu.constant';
import {YesOrNoList} from 'src/app/core/models/shared/YesOrNoList';
import {Alert} from 'src/app/core/models/shared/Alert';
import {AlertType} from 'src/app/core/enums/alert-type';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {SubCategory} from 'src/app/core/models/admin/category/SubCategory';
import {SubCategoryService} from 'src/app/core/services/admin/category/sub-category/sub-category.service';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {Theme} from "../../../../../../shared/models/Theme";

@Component({
  selector: 'app-sub-category-search',
  templateUrl: './sub-category-search.component.html',
  styleUrls: ['./sub-category-search.component.scss']
})
export class SubCategorySearchComponent implements OnInit, AfterViewInit {
  alert!: Alert;
  faTrash: IconDefinition = faTrash;
  showAlert: boolean = false;
  subCategorySearchForm!: FormGroup;
  categoryList: Category[] = [];
  subCategoryList: SubCategory[] = [];
  yesOrNoList: YesOrNoList[] = MenuConstant.yesOrNoList;
  submitted: boolean = false;
  busyLoading!: Subscription;
  busySaving!: Subscription;
  busyDeleting!: Subscription;
  lang: string = '';
  theme!: Theme;

  constructor(private router: Router, private commonService: CommonService, private subCategoryService: SubCategoryService, private confirmationService: ConfirmationService) {
    this.commonService.setShowNav(true);
    this.initSubscription();
    this.commonService.getCategoryList().subscribe((data: any) => {
      this.categoryList = data as Array<Category>;
    });
    this.list(new SubCategory());
    this.alert = new Alert('', AlertType.SUCCESS);
    this.initForm();
  }

  initSubscription() {
    this.commonService.getTheme().subscribe(value => {
      this.theme = value;
    });
    this.commonService.getLang().subscribe(value => {
      this.lang = value;
    });
  }

  initForm() {
    this.subCategorySearchForm = new FormGroup(
      {
        nme: new FormControl('', [Validators.minLength(3), Validators.maxLength(60)]),
        categoryId: new FormControl('', []),
        active: new FormControl('', []),
      }
    );
  }

  ngAfterViewInit(): void {
    this.commonService.setShowPreLoader(false);
  }

  ngOnInit(): void {
  }

  search(): void {
    this.submitted = true;
    if (this.subCategorySearchForm.valid) {
      this.list(this.subCategorySearchForm.value);
    }
  }

  reset(): void {
    this.submitted = false;
    this.showAlert = false;
    this.subCategorySearchForm.reset();
  }

  delete(subCategory: SubCategory): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      accept: () => {
        this.busyDeleting = this.subCategoryService.delete(subCategory).subscribe({
          next: (response: any) => {
            this.showAlert = true;
            if (response?.message) {
              this.alert = new Alert(response?.message, AlertType.SUCCESS);
              this.list(new SubCategory());
            } else this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
          },
          error: (errorResponse) => {
            this.showAlert = true;
            if (errorResponse?.error?.message)
              this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
            else this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
          }
        });
      }
    });
  }

  list(subCategory: SubCategory): void {
    this.subCategoryService.list(subCategory).subscribe({
      next: (response) => {
        this.subCategoryList = response as Array<SubCategory>;
      },
      error: (errorResponse) => {
        this.showAlert = true;
        if (errorResponse?.error?.message)
          this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
        else this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
      }
    });
  }

  getCategoryName(id: number): string {
    let category = this.categoryList.filter(category => category.id == id);
    if (category)
      return category[0].nme;
    else return '';
  }

  add(): void {
    this.router.navigate(
      ['admin/subCategory'],
      {
        queryParams: {
          id: 0
        }
      }
    );
  }

}
