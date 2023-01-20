import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Region } from 'src/app/admin/location/models/Region';
import { faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { MenuConstant } from 'src/app/core/constants/menu.constant';
import { YesOrNoList } from 'src/app/shared/models/YesOrNoList';
import { Alert } from 'src/app/shared/models/Alert';
import { AlertType } from 'src/app/core/enums/alert-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/admin/location/models/Country';
import { CountryService } from 'src/app/admin/location/services/country/country.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import {Theme} from "src/app/shared/models/Theme";
@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss']
})
export class CountrySearchComponent implements OnInit, AfterViewInit {
  alert!: Alert;
  faTrash: IconDefinition = faTrash;
  showAlert: boolean = false;
  countrySearchForm!: FormGroup;
  regionList: Region[] = [];
  countryList: Country[] = [];
  yesOrNoList: YesOrNoList[] = MenuConstant.yesOrNoList;
  submitted: boolean = false;
  busyLoading!: Subscription;
  busySaving!: Subscription;
  busyDeleting!: Subscription;
  lang: string = '';
  theme!: Theme;
  constructor(private router: Router, private commonService: CommonService, private countryService: CountryService, private confirmationService: ConfirmationService) {
    this.commonService.setShowNav(true);
    this.initSubscription();
    this.commonService.getRegionList().subscribe((data: any) => {
      this.regionList = data as Array<Region>;
    });
    this.list(new Country());
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
    this.countrySearchForm = new FormGroup(
      {
        nme: new FormControl('', [Validators.minLength(3), Validators.maxLength(60)]),
        regionId: new FormControl('', []),
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
    if (this.countrySearchForm.valid) {
      this.list(this.countrySearchForm.value);
    }
  }

  reset(): void {
    this.submitted = false;
    this.showAlert = false;
    this.countrySearchForm.reset();
  }

  delete(country: Country): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      accept: () => {
        this.busyDeleting = this.countryService.delete(country).subscribe({
          next: (response: any) => {
            this.showAlert = true;
            if (response?.message) {
              this.alert = new Alert(response?.message, AlertType.SUCCESS);
              this.list(new Country());
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

  list(country: Country): void {
    this.countryService.list(country).subscribe({
      next: (response) => {
        this.countryList = response as Array<Country>;
      },
      error: (errorResponse) => {
        this.showAlert = true;
        if (errorResponse?.error?.message)
          this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
        else this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
      }
    });
  }

  getRegionName(id: number): string {
    let region = this.regionList.filter(region => region.id == id);
    if (region)
      return region[0].nme;
    else return '';
  }

  add(): void {
    this.router.navigate(
      ['admin/country'],
      {
        queryParams: {
          id: 0
        }
      }
    );
  }

}
