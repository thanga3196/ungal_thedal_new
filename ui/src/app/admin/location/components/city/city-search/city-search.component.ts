import { AfterViewInit, Component, OnInit } from '@angular/core';
import { District } from 'src/app/admin/location/models/District';
import { faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { MenuConstant } from 'src/app/core/constants/menu.constant';
import { YesOrNoList } from 'src/app/shared/models/YesOrNoList';
import { Alert } from 'src/app/shared/models/Alert';
import { AlertType } from 'src/app/core/enums/alert-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { City } from 'src/app/admin/location/models/City';
import { CityService } from 'src/app/admin/location/services/city/city.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import {Theme} from "src/app/shared/models/Theme";
@Component({
  selector: 'app-area-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit, AfterViewInit {
  alert!: Alert;
  faTrash: IconDefinition = faTrash;
  showAlert: boolean = false;
  citySearchForm!: FormGroup;
  districtList: District[] = [];
  cityList: City[] = [];
  yesOrNoList: YesOrNoList[] = MenuConstant.yesOrNoList;
  submitted: boolean = false;
  busyLoading!: Subscription;
  busySaving!: Subscription;
  busyDeleting!: Subscription;
  lang: string = '';
  theme!: Theme;
  constructor(private router: Router, private commonService: CommonService, private cityService: CityService, private confirmationService: ConfirmationService) {
    this.commonService.setShowNav(true);
    this.initSubscription();
    this.commonService.getDistrictList().subscribe((data: any) => {
      this.districtList = data as Array<District>;
    });
    this.list(new City());
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
    this.citySearchForm = new FormGroup(
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
    if (this.citySearchForm.valid) {
      this.list(this.citySearchForm.value);
    }
  }

  reset(): void {
    this.submitted = false;
    this.showAlert = false;
    this.citySearchForm.reset();
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
