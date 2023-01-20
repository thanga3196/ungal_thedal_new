import {AfterViewInit, Component, OnInit} from '@angular/core';
import {faTrash, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {CommonService} from 'src/app/shared/services/common/common.service';
import {MenuConstant} from 'src/app/core/constants/menu.constant';
import {YesOrNoList} from 'src/app/shared/models/YesOrNoList';
import {Alert} from 'src/app/shared/models/Alert';
import {AlertType} from 'src/app/core/enums/alert-type';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Region} from 'src/app/admin/location/models/Region';
import {RegionService} from 'src/app/admin/location/services/region/region.service';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {Theme} from "src/app/shared/models/Theme";

@Component({
  selector: 'app-region-search',
  templateUrl: './region-search.component.html',
  styleUrls: ['./region-search.component.scss']
})
export class RegionSearchComponent implements OnInit, AfterViewInit {
  alert!: Alert;
  faTrash: IconDefinition = faTrash;
  showAlert: boolean = false;
  regionSearchForm!: FormGroup;
  regionList: Region[] = [];
  yesOrNoList: YesOrNoList[] = MenuConstant.yesOrNoList;
  submitted: boolean = false;
  busyLoading!: Subscription;
  busySaving!: Subscription;
  busyDeleting!: Subscription;
  lang: string = '';
  theme!: Theme;
  constructor(private router: Router, private commonService: CommonService, private regionService: RegionService, private confirmationService: ConfirmationService) {
    this.commonService.setShowNav(true);
    this.initSubscription();
    this.list(new Region());
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
    this.regionSearchForm = new FormGroup(
      {
        nme: new FormControl('', [Validators.minLength(3), Validators.maxLength(60)]),
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
    if (this.regionSearchForm.valid) {
      this.list(this.regionSearchForm.value);
    }
  }

  reset(): void {
    this.submitted = false;
    this.showAlert = false;
    this.regionSearchForm.reset();
  }

  delete(region: Region): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      accept: () => {
        this.busyDeleting = this.regionService.delete(region).subscribe({
          next: (response: any) => {
            this.showAlert = true;
            if (response?.message) {
              this.alert = new Alert(response?.message, AlertType.SUCCESS);
              this.list(new Region());
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

  list(region: Region): void {
    this.regionService.list(region).subscribe({
      next: (response) => {
        this.regionList = response as Array<Region>;
      },
      error: (errorResponse) => {
        this.showAlert = true;
        if (errorResponse?.error?.message)
          this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
        else this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
      }
    });
  }

  add(): void {
    this.router.navigate(
      ['admin/region'],
      {
        queryParams: {
          id: 0
        }
      }
    );
  }

}
