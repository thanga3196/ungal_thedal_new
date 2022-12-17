import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { State } from 'src/app/core/models/admin/location/State';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { MenuConstant } from 'src/app/core/constants/menu.constant';
import { YesOrNoList } from 'src/app/core/models/shared/YesOrNoList';
import { Alert } from 'src/app/core/models/shared/Alert';
import { AlertType } from 'src/app/core/enums/alert-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DistrictService } from 'src/app/core/services/admin/location/district/district.service';
import { District } from 'src/app/core/models/admin/location/District';
import {Theme} from "../../../../../shared/models/Theme";
@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit, AfterViewInit {
  alert!: Alert;
  showAlert: boolean = false;
  districtForm!: FormGroup;
  stateList: State[] = [];
  yesOrNoList: YesOrNoList[] = MenuConstant.yesOrNoList;
  submitted: boolean = false;
  busyLoading!: Subscription;
  busySaving!: Subscription;
  lang: string = '';
  theme!: Theme;
  constructor(private commonService: CommonService, private districtService: DistrictService, private activatedRoute: ActivatedRoute, private location: Location) {
    this.commonService.setShowNav(true);
    this.initSubscription();
    this.commonService.getStateList().subscribe((data: any) => {
      this.stateList = data as Array<State>;
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
    this.districtForm = new FormGroup(
      {
        id: new FormControl(0, []),
        nme: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
        stateId: new FormControl('', [Validators.required]),
        active: new FormControl(true, [Validators.required]),
      }
    );
  }
  ngAfterViewInit(): void {
    this.commonService.setShowPreLoader(false);
  }

  ngOnInit(): void {
    const districtId = this.activatedRoute?.params.subscribe(value => {
      let id = value['id'] ? value['id'] as number : 0;
      let district = new District();
      district.id = id;
      if (id == 0)
        return;
      this.busyLoading = this.districtService.getById(district).subscribe({
        next: (response) => {
          this.showAlert = true;
          let district: any = response;
          if ('id' in district && district?.id > 0) {
            this.showAlert = false;
            this.districtForm.get('id')?.setValue(district.id);
            this.districtForm.get('nme')?.setValue(district.nme);
            this.districtForm.get('stateId')?.setValue(district.stateId);
            this.districtForm.get('active')?.setValue(district.active);
          }
          else {
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
    if (this.districtForm.valid) {
      this.busySaving = this.districtService.save(this.districtForm.value).subscribe({
        next: (response) => {
          this.showAlert = true;
          let district: any = response;
          if ('id' in district && district?.id > 0) {
            this.districtForm.get("id")?.setValue(district?.id);
            this.location.replaceState("/admin/district/" + district?.id);
            this.alert = new Alert("District '" + district?.nme + "' saved successfully.", AlertType.SUCCESS);
          }
          else if ('message' in district) {
            this.alert = new Alert(district?.message, AlertType.WARNING);
          }
          else this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
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
    this.districtForm.reset();
    this.location.go("/admin/district/0");
  }

}
