import { AfterViewInit, Component, OnInit } from '@angular/core';
import { State } from 'src/app/admin/location/models/State';
import { faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { MenuConstant } from 'src/app/core/constants/menu.constant';
import { YesOrNoList } from 'src/app/shared/models/YesOrNoList';
import { Alert } from 'src/app/shared/models/Alert';
import { AlertType } from 'src/app/core/enums/alert-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { District } from 'src/app/admin/location/models/District';
import { DistrictService } from 'src/app/admin/location/services/district/district.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import {Theme} from "src/app/shared/models/Theme";
@Component({
  selector: 'app-district-search',
  templateUrl: './district-search.component.html',
  styleUrls: ['./district-search.component.scss']
})
export class DistrictSearchComponent implements OnInit, AfterViewInit {
  alert!: Alert;
  faTrash: IconDefinition = faTrash;
  showAlert: boolean = false;
  districtSearchForm!: FormGroup;
  stateList: State[] = [];
  districtList: District[] = [];
  yesOrNoList: YesOrNoList[] = MenuConstant.yesOrNoList;
  submitted: boolean = false;
  busyLoading!: Subscription;
  busySaving!: Subscription;
  busyDeleting!: Subscription;
  lang: string = '';
  theme!: Theme;
  constructor(private router: Router, private commonService: CommonService, private districtService: DistrictService, private confirmationService: ConfirmationService) {
    this.commonService.setShowNav(true);
    this.initSubscription();
    this.commonService.getStateList().subscribe((data: any) => {
      this.stateList = data as Array<State>;
    });
    this.list(new District());
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
    this.districtSearchForm = new FormGroup(
      {
        nme: new FormControl('', [Validators.minLength(3), Validators.maxLength(60)]),
        stateId: new FormControl('', []),
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
    if (this.districtSearchForm.valid) {
      this.list(this.districtSearchForm.value);
    }
  }

  reset(): void {
    this.submitted = false;
    this.showAlert = false;
    this.districtSearchForm.reset();
  }

  delete(district: District): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      accept: () => {
        this.busyDeleting = this.districtService.delete(district).subscribe({
          next: (response: any) => {
            this.showAlert = true;
            if (response?.message) {
              this.alert = new Alert(response?.message, AlertType.SUCCESS);
              this.list(new District());
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

  list(district: District): void {
    this.districtService.list(district).subscribe({
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

  getStateName(id: number): string {
    let state = this.stateList.filter(state => state.id == id);
    if (state && state?.length > 0)
      return state[0].nme;
    else return '';
  }

  add(): void {
    this.router.navigate(
      ['admin/district'],
      {
        queryParams: {
          id: 0
        }
      }
    );
  }

}
