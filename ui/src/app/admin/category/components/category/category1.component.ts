import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from 'src/app/shared/services/common/common.service';
import {MenuConstant} from 'src/app/core/constants/menu.constant';
import {YesOrNoList} from 'src/app/shared/models/YesOrNoList';
import {Alert} from 'src/app/shared/models/Alert';
import {AlertType} from 'src/app/core/enums/alert-type';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {CategoryService} from 'src/app/admin/category/services/category/category.service';
import {Category} from 'src/app/admin/category/models/Category';
import {Icon} from "src/app/shared/models/Icon";
import {Theme} from "src/app/shared/models/Theme";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-category',
  templateUrl: './category1.component.html',
  styleUrls: ['./category1.component.scss']
})
export class Category1Component implements OnInit, AfterViewInit {
  alert!: Alert;
  showAlert: boolean = false;
  categoryForm!: FormGroup;
  yesOrNoList: YesOrNoList[] = MenuConstant.yesOrNoList;
  iconList: Icon[] = [];
  submitted: boolean = false;
  busyLoading!: Subscription;
  busySaving!: Subscription;
  lang: string = '';
  theme!: Theme;

  constructor(private commonService: CommonService, private categoryService: CategoryService, private activatedRoute: ActivatedRoute, private location: Location, private messageService: MessageService) {
    this.commonService.setShowNav(true);
    this.initSubscription();
    this.commonService.getIconList().subscribe((data: any) => {
      this.iconList = data as Array<Icon>;
    });
    this.alert = new Alert('', AlertType.SUCCESS);
    this.initForm();
  }

  initForm() {
    this.categoryForm = new FormGroup(
      {
        id: new FormControl(0, []),
        nme: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
        active: new FormControl(true, [Validators.required]),
        logo: new FormControl('', []),
      }
    );
  }

  initSubscription() {
    this.commonService.getTheme().subscribe(value => {
      this.theme = value;
    });
    this.commonService.getLang().subscribe(value => {
      this.lang = value;
    });
  }

  ngAfterViewInit(): void {
    this.commonService.setShowPreLoader(false);
  }

  ngOnInit(): void {
    this.activatedRoute?.params.subscribe(value => {
      let id = value['id'] ? value['id'] as number : 0;
      let category = new Category();
      category.id = id;
      if (id == 0)
        return;
      this.getById(category);
    });
  }

  save(): void {
    this.submitted = true;
    if (this.categoryForm.valid) {
      this.busySaving = this.categoryService.save(this.categoryForm.value).subscribe({
        next: (response) => {
          this.showAlert = true;
          let category: any = response;
          if ('id' in category && category?.id > 0) {
            this.categoryForm.get("id")?.setValue(category?.id);
            this.location.replaceState("/admin/category/" + category?.id);
            this.messageService.add({
              severity: 'success',
              summary: 'Save',
              detail: "Category '" + category?.nme + "' saved successfully."
            });
          } else if ('message' in category) {
            this.alert = new Alert(category?.message, AlertType.WARNING);
          } else this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
          this.submitted = false;
        },
        error: (errorResponse) => {
          this.showAlert = true;
          if (errorResponse?.error?.message) {
            this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
          } else this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
        }
      });
      this.submitted = false;
    }
  }

  reset(): void {
    this.submitted = false;
    this.showAlert = false;
    this.categoryForm.reset();
    this.location.go("/admin/category/0");
  }

  getById(category: Category) {
    this.busyLoading = this.categoryService.getById(category).subscribe({
        next: (response) => {
          this.showAlert = true;
          let category: any = response;
          if (category && category?.id > 0) {
            this.showAlert = false;
            this.categoryForm.get('id')?.setValue(category.id);
            this.categoryForm.get('nme')?.setValue(category.nme);
            this.categoryForm.get('districtId')?.setValue(category.districtId);
            this.categoryForm.get('active')?.setValue(category.active);
            this.categoryForm.get('logo')?.setValue(category.logo);
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
  }
}
