import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Region} from 'src/app/core/models/admin/location/Region';
import {CommonService} from 'src/app/shared/service/common/common.service';
import {MenuConstant} from 'src/app/core/constants/menu.constant';
import {YesOrNoList} from 'src/app/core/models/shared/YesOrNoList';
import {Alert} from 'src/app/core/models/shared/Alert';
import {AlertType} from 'src/app/core/enums/alert-type';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {CountryService} from 'src/app/core/services/admin/location/country/country.service';
import {Country} from 'src/app/core/models/admin/location/Country';
import {State} from "../../../../models/admin/location/State";
import {Theme} from "../../../../../shared/models/Theme";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, AfterViewInit {
  alert!: Alert;
  showAlert: boolean = false;
  countryForm!: FormGroup;
  regionList: Region[] = [];
  yesOrNoList: YesOrNoList[] = MenuConstant.yesOrNoList;
  submitted: boolean = false;
  busyLoading!: Subscription;
  busySaving!: Subscription;
  stateList: State[] = [];
  lang: string = '';
  theme!: Theme;

  constructor(private commonService: CommonService, private countryService: CountryService, private activatedRoute: ActivatedRoute, private location: Location) {
    this.commonService.setShowNav(true);
    this.initSubscription();
    this.commonService.getRegionList().subscribe((data: any) => {
      this.regionList = data as Array<Region>;
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
    this.countryForm = new FormGroup(
      {
        id: new FormControl(0, []),
        nme: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
        cde: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
        regionId: new FormControl('', [Validators.required]),
        active: new FormControl(true, [Validators.required]),
      }
    );
  }

  ngAfterViewInit(): void {
    this.commonService.setShowPreLoader(false);
  }

  ngOnInit(): void {
    const countryId = this.activatedRoute?.params.subscribe(value => {
      let id = value['id'] ? value['id'] as number : 0;
      let country = new Country();
      country.id = id;
      if (id == 0)
        return;
      this.busyLoading = this.countryService.getById(country).subscribe({
          next: (response) => {
            this.showAlert = true;
            let country: any = response;
            if ('id' in country && country?.id > 0) {
              this.showAlert = false;
              this.countryForm.get('id')?.setValue(country.id);
              this.countryForm.get('nme')?.setValue(country.nme);
              this.countryForm.get('cde')?.setValue(country.cde);
              this.countryForm.get('regionId')?.setValue(country.regionId);
              this.countryForm.get('active')?.setValue(country.active);
              this.listStateByCountry(country);
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

  listStateByCountry(country: Country): void {
    this.countryService.listStateByCountry(country).subscribe({
      next: (response) => {
        this.stateList = response as Array<State>;
      },
      error: (errorResponse) => {
        this.showAlert = true;
        if (errorResponse?.error?.message)
          this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
        else this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
      }
    });
  }

  save(): void {
    this.submitted = true;
    if (this.countryForm.valid) {
      this.busySaving = this.countryService.save(this.countryForm.value).subscribe({
        next: (response) => {
          this.showAlert = true;
          let country: any = response;
          if ('id' in country && country?.id > 0) {
            this.countryForm.get("id")?.setValue(country?.id);
            this.location.replaceState("/admin/country/" + country?.id);
            this.alert = new Alert("Country '" + country?.nme + "' saved successfully.", AlertType.SUCCESS);
          } else if ('message' in country) {
            this.alert = new Alert(country?.message, AlertType.WARNING);
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
    this.countryForm.reset();
    this.location.go("/admin/country/0");
  }

}
