import { Component, OnInit } from '@angular/core';
import {Alert} from "../../../../models/shared/Alert";
import {faTrash, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {District} from "../../../../models/admin/location/District";
import {City} from "../../../../models/admin/location/City";
import {YesOrNoList} from "../../../../models/shared/YesOrNoList";
import {MenuConstant} from "../../../../constants/menu.constant";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {CommonService} from "../../../../../shared/service/common/common.service";
import {CityService} from "../../../../services/admin/location/city/city.service";
import {ConfirmationService} from "primeng/api";
import {AlertType} from "../../../../enums/alert-type";
import {Category} from "../../../../models/admin/category/Category";
import {SubCategory} from "../../../../models/admin/category/SubCategory";

@Component({
  selector: 'app-ad-home-carousel',
  templateUrl: './ad-home-carousel.component.html',
  styleUrls: ['./ad-home-carousel.component.scss']
})
export class AdHomeCarouselComponent implements OnInit {

  alert!: Alert;
  faTrash: IconDefinition = faTrash;
  showAlert: boolean = false;
  adHomeCarouselSearchForm!: FormGroup;
  districtList: District[] = [];
  cityList: City[] = [];
  categoryList: Category[] = [];
  subCategoryList: SubCategory[] = [];
  businessList: any[] = [];
  yesOrNoList: YesOrNoList[] = MenuConstant.yesOrNoList;
  submitted: boolean = false;
  busyLoading!: Subscription;
  busySaving!: Subscription;
  busyDeleting!: Subscription;
  constructor(private router: Router, private commonService: CommonService, private cityService: CityService, private confirmationService: ConfirmationService) {
    this.commonService.setShowNav(true);
    this.commonService.getDistrictList().subscribe((data: any) => {
      this.districtList = data as Array<District>;
    });
    this.list(new City());
    this.alert = new Alert('', AlertType.SUCCESS);
    this.initForm();
  }

  initForm() {
    this.adHomeCarouselSearchForm = new FormGroup(
      {
        nme: new FormControl('', [Validators.minLength(3), Validators.maxLength(60)]),
        districtId: new FormControl('', []),
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
    if (this.adHomeCarouselSearchForm.valid) {
      this.list(this.adHomeCarouselSearchForm.value);
    }
  }

  reset(): void {
    this.submitted = false;
    this.showAlert = false;
    this.adHomeCarouselSearchForm.reset();
  }

  delete(city: City): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      accept: () => {
        this.busyDeleting = this.cityService.delete(city).subscribe({
          next: (response: any) => {
            this.showAlert = true;
            if (response?.message) {
              this.alert = new Alert(response?.message, AlertType.SUCCESS);
              this.list(new City());
            }
            else this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
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

  list(city: City): void {
    this.cityService.list(city).subscribe({
      next: (response) => {
        this.cityList = response as Array<City>;
      },
      error: (errorResponse) => {
        this.showAlert = true;
        if (errorResponse?.error?.message)
          this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
        else this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
      }
    });
  }

  getDistrictName(id: number): string {
    let district = this.districtList.filter(district => district.id == id);
    if (district && district?.length > 0)
      return district[0].nme;
    else return '';
  }

  add(): void {
    this.router.navigate(
      ['admin/city'],
      {
        queryParams: {
          id: 0
        }
      }
    );
  }

}
