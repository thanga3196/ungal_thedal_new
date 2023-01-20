import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Country} from 'src/app/admin/location/models/Country';
import {CommonService} from 'src/app/shared/services/common/common.service';
import {MenuConstant} from 'src/app/core/constants/menu.constant';
import {YesOrNoList} from 'src/app/shared/models/YesOrNoList';
import {Alert} from 'src/app/shared/models/Alert';
import {AlertType} from 'src/app/core/enums/alert-type';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {StateService} from 'src/app/admin/location/services/state/state.service';
import {State} from 'src/app/admin/location/models/State';
import {District} from "src/app/admin/location/models/District";
import {Theme} from "src/app/shared/models/Theme";

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit, AfterViewInit {
  alert!: Alert;
  showAlert: boolean = false;
  stateForm!: FormGroup;
  countryList: Country[] = [];
  yesOrNoList: YesOrNoList[] = MenuConstant.yesOrNoList;
  submitted: boolean = false;
  busyLoading!: Subscription;
  busySaving!: Subscription;
  districtList: District[] = [];
  lang: string = '';
  theme!: Theme;
  constructor(private commonService: CommonService, private stateService: StateService, private activatedRoute: ActivatedRoute, private location: Location) {
    this.commonService.setShowNav(true);
    this.initSubscription();
    this.commonService.getCountryList().subscribe((data: any) => {
      this.countryList = data as Array<Country>;
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
    this.stateForm = new FormGroup(
      {
        id: new FormControl(0, []),
        nme: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
        countryId: new FormControl('', [Validators.required]),
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
      let state = new State();
      state.id = id;
      if (id == 0)
        return;
      this.busyLoading = this.stateService.getById(state).subscribe({
          next: (response) => {
            this.showAlert = true;
            let state: any = response;
            if ('id' in state && state?.id > 0) {
              this.showAlert = false;
              this.stateForm.get('id')?.setValue(state.id);
              this.stateForm.get('nme')?.setValue(state.nme);
              this.stateForm.get('countryId')?.setValue(state.countryId);
              this.stateForm.get('active')?.setValue(state.active);
              this.listDistrictByState(state);
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

  listDistrictByState(state: State): void {
    this.stateService.listDistrictByState(state).subscribe({
      next: (response) => {
        this.districtList = response as Array<District>;
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
    if (this.stateForm.valid) {
      this.busySaving = this.stateService.save(this.stateForm.value).subscribe({
        next: (response) => {
          this.showAlert = true;
          let state: any = response;
          if ('id' in state && state?.id > 0) {
            this.stateForm.get("id")?.setValue(state?.id);
            this.location.replaceState("/admin/state/" + state?.id);
            this.alert = new Alert("State '" + state?.nme + "' saved successfully.", AlertType.SUCCESS);
          } else if ('message' in state) {
            this.alert = new Alert(state?.message, AlertType.WARNING);
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
    this.stateForm.reset();
    this.location.go("/admin/state/0");
  }

}
