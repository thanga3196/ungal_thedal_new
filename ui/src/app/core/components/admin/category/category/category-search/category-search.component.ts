import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {ConfirmationService} from 'primeng/api';
import {Subscription} from 'rxjs';
import {MenuConstant} from 'src/app/core/constants/menu.constant';
import {AlertType} from 'src/app/core/enums/alert-type';
import {Category} from 'src/app/core/models/admin/category/Category';
import {Alert} from 'src/app/core/models/shared/Alert';
import {YesOrNoList} from 'src/app/core/models/shared/YesOrNoList';
import {CategoryService} from 'src/app/core/services/admin/category/category/category.service';
import {CommonService} from 'src/app/shared/service/common/common.service';
import {Theme} from "../../../../../../shared/models/Theme";

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss']
})
export class CategorySearchComponent implements OnInit {
  alert!: Alert;
  faTrash: IconDefinition = faTrash;
  showAlert: boolean = false;
  categorySearchForm!: FormGroup;
  categoryList: Category[] = [];
  yesOrNoList: YesOrNoList[] = MenuConstant.yesOrNoList;
  submitted: boolean = false;
  busyLoading!: Subscription;
  busySaving!: Subscription;
  busyDeleting!: Subscription;
  lang: string = '';
  theme!: Theme;

  constructor(private router: Router, private commonService: CommonService, private categoryService: CategoryService, private confirmationService: ConfirmationService) {
    this.commonService.setShowNav(true);
    this.initSubscription();
    this.list(new Category());
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
    this.categorySearchForm = new FormGroup(
      {
        nme: new FormControl('', [Validators.minLength(3), Validators.maxLength(60)]),
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
    if (this.categorySearchForm.valid) {
      this.list(this.categorySearchForm.value);
    }
  }

  reset(): void {
    this.submitted = false;
    this.showAlert = false;
    this.categorySearchForm.reset();
  }

  delete(category: Category): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      accept: () => {
        this.busyDeleting = this.categoryService.delete(category).subscribe({
          next: (response: any) => {
            this.showAlert = true;
            if (response?.message) {
              this.alert = new Alert(response?.message, AlertType.SUCCESS);
              this.list(new Category());
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

  list(category: Category): void {
    this.categoryService.list(category).subscribe({
      next: (response) => {
        this.categoryList = response as Array<Category>;
      },
      error: (errorResponse) => {
        this.showAlert = true;
        if (errorResponse?.error?.message)
          this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
        else this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
      }
    });
  }

  add(): void {
    this.router.navigate(
      ['admin/category'],
      {
        queryParams: {
          id: 0
        }
      }
    );
  }
}
