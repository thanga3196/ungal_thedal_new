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
import {RegionService} from 'src/app/admin/location/services/region/region.service';
import {Region} from 'src/app/admin/location/models/Region';
import {Country} from "src/app/admin/location/models/Country";
import {Theme} from "src/app/shared/models/Theme";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit, AfterViewInit {
  alert!: Alert;
  showAlert: boolean = false;
  regionForm!: FormGroup;
  yesOrNoList: YesOrNoList[] = MenuConstant.yesOrNoList;
  submitted: boolean = false;
  busyLoading!: Subscription;
  busySaving!: Subscription;
  countryList: Country[] = [];
  lang: string = '';
  theme!: Theme;

  constructor(private commonService: CommonService, private regionService: RegionService, private activatedRoute: ActivatedRoute, private location: Location) {
    this.commonService.setShowNav(true);
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
    this.regionForm = new FormGroup(
      {
        id: new FormControl(0, []),
        nme: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
        active: new FormControl(true, [Validators.required]),
      }
    );
  }

  ngAfterViewInit(): void {
    this.commonService.setShowPreLoader(false);
  }

  ngOnInit(): void {
    const regionId = this.activatedRoute?.params.subscribe(value => {
      let id = value['id'] ? value['id'] as number : 0;
      let region = new Region();
      region.id = id;
      if (id == 0)
        return;
      this.busyLoading = this.regionService.getById(region).subscribe({
          next: (response) => {
            this.showAlert = true;
            let region: any = response;
            if ('id' in region && region?.id > 0) {
              this.showAlert = false;
              this.regionForm.get('id')?.setValue(region.id);
              this.regionForm.get('nme')?.setValue(region.nme);
              this.regionForm.get('active')?.setValue(region.active);
              this.listCountryByRegion(region);
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

  listCountryByRegion(region: Region): void {
    this.regionService.listCountryByRegion(region).subscribe({
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

  save(): void {
    this.submitted = true;
    if (this.regionForm.valid) {
      this.busySaving = this.regionService.save(this.regionForm.value).subscribe({
        next: (response) => {
          this.showAlert = true;
          let region: any = response;
          if ('id' in region && region?.id > 0) {
            this.regionForm.get("id")?.setValue(region?.id);
            this.location.replaceState("/admin/region/" + region?.id);
            this.alert = new Alert("Region '" + region?.nme + "' saved successfully.", AlertType.SUCCESS);
          } else if ('message' in region) {
            this.alert = new Alert(region?.message, AlertType.WARNING);
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
    this.regionForm.reset();
    this.location.go("/admin/region/0");
  }

}
