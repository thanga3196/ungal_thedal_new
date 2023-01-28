import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Category} from 'src/app/admin/category/models/Category';
import {CommonService} from 'src/app/shared/services/common/common.service';
import {MenuConstant} from 'src/app/core/constants/menu.constant';
import {YesOrNoList} from 'src/app/shared/models/YesOrNoList';
import {Alert} from 'src/app/shared/models/Alert';
import {AlertType} from 'src/app/core/enums/alert-type';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {SubCategoryService} from 'src/app/admin/category/services/sub-category/sub-category.service';
import {SubCategory} from 'src/app/admin/category/models/SubCategory';
import {Theme} from "src/app/shared/models/Theme";
import {Icon} from 'src/app/shared/models/Icon';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit, AfterViewInit {
  alert!: Alert;
  showAlert: boolean = false;
  subCategoryForm!: FormGroup;
  categoryList: Category[] = [];
  yesOrNoList: YesOrNoList[] = MenuConstant.yesOrNoList;
  iconList: Icon[] = [];
  submitted: boolean = false;
  busyLoading!: Subscription;
  busySaving!: Subscription;
  lang: string = '';
  theme!: Theme;

  constructor(private commonService: CommonService, private subCategoryService: SubCategoryService, private activatedRoute: ActivatedRoute, private location: Location, private messageService: MessageService) {
    this.commonService.setShowNav(true);
    this.initSubscription();
    this.commonService.getCategoryList().subscribe((data: any) => {
      this.categoryList = data as Array<Category>;
    });
    this.commonService.getIconList().subscribe((data: any) => {
      this.iconList = data as Array<Icon>;
    });
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
    this.subCategoryForm = new FormGroup(
      {
        id: new FormControl(0, []),
        nme: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
        categoryId: new FormControl('', [Validators.required]),
        active: new FormControl(true, [Validators.required]),
        logo: new FormControl('', []),
      }
    );
  }

  ngAfterViewInit(): void {
    this.commonService.setShowPreLoader(false);
  }

  ngOnInit(): void {
    this.activatedRoute?.params.subscribe(value => {
      let id = value['id'] ? value['id'] as number : 0;
      let subCategory = new SubCategory();
      subCategory.id = id;
      if (id == 0)
        return;
      this.busyLoading = this.subCategoryService.getById(subCategory).subscribe({
          next: (response) => {
            this.showAlert = true;
            let subCategory: any = response;
            if ('id' in subCategory && subCategory?.id > 0) {
              this.showAlert = false;
              this.subCategoryForm.get('id')?.setValue(subCategory.id);
              this.subCategoryForm.get('nme')?.setValue(subCategory.nme);
              this.subCategoryForm.get('categoryId')?.setValue(subCategory.categoryId);
              this.subCategoryForm.get('active')?.setValue(subCategory.active);
              this.subCategoryForm.get('logo')?.setValue(subCategory.logo);
            } else {
              this.showAlert = true;
              this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
            }
            this.submitted = false;
          },
          error: (errorResponse) => {
            this.showAlert = true;
            if (errorResponse?.error?.message)
              this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
            else this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
          }
        }
      );
    });
  }

  save(): void {
    this.submitted = true;
    if (this.subCategoryForm.valid) {
      this.busySaving = this.subCategoryService.save(this.subCategoryForm.value).subscribe({
        next: (response) => {
          this.showAlert = true;
          let subCategory: any = response;
          if ('id' in subCategory && subCategory?.id > 0) {
            this.subCategoryForm.get("id")?.setValue(subCategory?.id);
            this.location.replaceState("/admin/sub-category/" + subCategory?.id);
            this.messageService.add({
              severity: "success",
              summary: "Save",
              detail: "Sub Category '" + subCategory?.nme + "' saved successfully."
            });
          } else if ('message' in subCategory) {
            this.alert = new Alert(subCategory?.message, AlertType.WARNING);
          } else this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
          this.submitted = false;
        },
        error: (errorResponse) => {
          this.showAlert = true;
          if (errorResponse?.error?.message)
            this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
          else this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
        }
      });
      this.submitted = false;
    }
  }

  reset(): void {
    this.submitted = false;
    this.showAlert = false;
    this.subCategoryForm.reset();
    this.location.go("/admin/sub-category/0");
  }

}
