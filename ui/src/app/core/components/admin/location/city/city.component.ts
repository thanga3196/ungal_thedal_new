import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { District } from 'src/app/core/models/admin/location/District';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { MenuConstant } from 'src/app/core/constants/menu.constant';
import { YesOrNoList } from 'src/app/core/models/shared/YesOrNoList';
import { Alert } from 'src/app/core/models/shared/Alert';
import { AlertType } from 'src/app/core/enums/alert-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CityService } from 'src/app/core/services/admin/location/city/city.service';
import { City } from 'src/app/core/models/admin/location/City';
import {Theme} from "../../../../../shared/models/Theme";
@Component({
  selector: 'app-area',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit, AfterViewInit {
  alert!: Alert;
  showAlert: boolean = false;
  areaForm!: FormGroup;
  districtList: District[] = [];
  yesOrNoList: YesOrNoList[] = MenuConstant.yesOrNoList;
  submitted: boolean = false;
  busyLoading!: Subscription;
  busySaving!: Subscription;
  lang: string = '';
  theme!: Theme;
  constructor(private commonService: CommonService, private areaService: CityService, private activatedRoute: ActivatedRoute, private location: Location) {
    this.commonService.setShowNav(true);
    this.initSubscription();
    this.commonService.getDistrictList().subscribe((data: any) => {
      this.districtList = data as Array<District>;
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
    this.areaForm = new FormGroup(
      {
        id: new FormControl(0, []),
        nme: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
        districtId: new FormControl('', [Validators.required]),
        active: new FormControl(true, [Validators.required]),
      }
    );
  }
  ngAfterViewInit(): void {
    this.commonService.setShowPreLoader(false);
  }

  ngOnInit(): void {
    this.activatedRoute?.params.subscribe(value => {
      let id = value['id'] ? value['id'] as number : 0;
      let area = new City();
      area.id = id;
      if (id == 0)
        return;
      this.busyLoading = this.areaService.getById(area).subscribe({
        next: (response) => {
          this.showAlert = true;
          let area: any = response;
          if ('id' in area && area?.id > 0) {
            this.showAlert = false;
            this.areaForm.get('id')?.setValue(area.id);
            this.areaForm.get('nme')?.setValue(area.nme);
            this.areaForm.get('districtId')?.setValue(area.districtId);
            this.areaForm.get('active')?.setValue(area.active);
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
    if (this.areaForm.valid) {
      this.busySaving = this.areaService.save(this.areaForm.value).subscribe({
        next: (response) => {
          this.showAlert = true;
          let area: any = response;
          if ('id' in area && area?.id > 0) {
            this.areaForm.get("id")?.setValue(area?.id);
            this.location.replaceState("/admin/area/" + area?.id);
            this.alert = new Alert("City '" + area?.nme + "' saved successfully.", AlertType.SUCCESS);
          }
          else if ('message' in area) {
            this.alert = new Alert(area?.message, AlertType.WARNING);
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
    this.areaForm.reset();
    this.location.go("/admin/area/0");
  }

}
