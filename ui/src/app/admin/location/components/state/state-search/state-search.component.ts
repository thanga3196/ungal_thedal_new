import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Country } from 'src/app/admin/location/models/Country';
import { faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { MenuConstant } from 'src/app/core/constants/menu.constant';
import { YesOrNoList } from 'src/app/shared/models/YesOrNoList';
import { Alert } from 'src/app/shared/models/Alert';
import { AlertType } from 'src/app/core/enums/alert-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { State } from 'src/app/admin/location/models/State';
import { StateService } from 'src/app/admin/location/services/state/state.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import {Theme} from "src/app/shared/models/Theme";
@Component({
  selector: 'app-state-search',
  templateUrl: './state-search.component.html',
  styleUrls: ['./state-search.component.scss']
})
export class StateSearchComponent implements OnInit, AfterViewInit {
  alert!: Alert;
  faTrash: IconDefinition = faTrash;
  showAlert: boolean = false;
  stateSearchForm!: FormGroup;
  countryList: Country[] = [];
  stateList: State[] = [];
  yesOrNoList: YesOrNoList[] = MenuConstant.yesOrNoList;
  submitted: boolean = false;
  busyLoading!: Subscription;
  busySaving!: Subscription;
  busyDeleting!: Subscription;
  lang: string = '';
  theme!: Theme;

  constructor(private router: Router, private commonService: CommonService, private stateService: StateService, private confirmationService: ConfirmationService) {
    this.commonService.setShowNav(true);
    this.initSubscription();
    this.commonService.getCountryList().subscribe((data: any) => {
      this.countryList = data as Array<Country>;
    });
    this.list(new State());
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
    this.stateSearchForm = new FormGroup(
      {
        nme: new FormControl('', [Validators.minLength(3), Validators.maxLength(60)]),
        countryId: new FormControl('', []),
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
    if (this.stateSearchForm.valid) {
      this.list(this.stateSearchForm.value);
    }
  }

  reset(): void {
    this.submitted = false;
    this.showAlert = false;
    this.stateSearchForm.reset();
  }

  delete(state: State): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      accept: () => {
        this.busyDeleting = this.stateService.delete(state).subscribe({
          next: (response: any) => {
            this.showAlert = true;
            if (response?.message) {
              this.alert = new Alert(response?.message, AlertType.SUCCESS);
              this.list(new State());
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

  list(state: State): void {
    this.stateService.list(state).subscribe({
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

  getCountryName(id: number): string {
    let country = this.countryList.filter(country => country.id == id);
    if (country)
      return country[0].nme;
    else return '';
  }

  add(): void {
    this.router.navigate(
      ['admin/state'],
      {
        queryParams: {
          id: 0
        }
      }
    );
  }

}
