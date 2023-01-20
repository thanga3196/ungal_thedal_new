import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonService} from 'src/app/shared/services/common/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from "rxjs";
import {Alert} from "src/app/shared/models/Alert";
import {AlertType} from "src/app/core/enums/alert-type";
import {AuthService} from "src/app/core/services/auth/auth.service";
import {Theme} from "src/app/shared/models/Theme";
import {Constant} from "src/app/core/constants/constant";
import {emailOrMobileValidator} from "src/app/shared/validators/email-or-mobile-validator";
import {Country} from "src/app/admin/location/models/Country";
import {LoginRequest} from "src/app/core/models/auth/LoginRequest";
import {AccessTokenResponse} from "src/app/core/models/auth/AccessTokenResponse";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  useEmail: boolean = true;
  loginForm!: FormGroup;
  submitted: boolean = false;
  busyLogin!: Subscription;
  showAlert: boolean = false;
  alert!: Alert;
  theme!: Theme;
  countryList: Country[] = [];
  customMobilePattern: any = Constant.customMobilePattern;
  redirectUrl!: string;

  //@ViewChild("loginVideo") loginVideo!: ElementRef;

  constructor(private commonService: CommonService, private elementRef: ElementRef, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.initSubscription();
    this.initForm();
    this.commonService.getCountryList().subscribe((data: any) => {
      this.countryList = data as Array<Country>;
      this.loginForm.get('countryList')?.setValue(this.countryList);
    });
    this.alert = new Alert('', AlertType.SUCCESS);
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage = 'url("assets/images/background.jpg")';
    this.commonService.setShowPreLoader(false);
    //this.loginVideo.nativeElement.playbackRate = 0.5;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.redirectUrl = queryParams['requestUrl']
    });
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', []),
      countryCde: new FormControl('+91', []),
      countryList: new FormControl([], []),
      mobile: new FormControl('', []),
      isEmail: new FormControl(this.useEmail, []),
      password: new FormControl('', Validators.required),
    }, [
      emailOrMobileValidator('email', 'mobile', 'countryCde', 'isEmail', 'countryList')
    ]);
  }

  initSubscription() {
    this.commonService.getTheme().subscribe(value => {
      this.theme = value;
    });
    this.commonService.setShowNav(false);
  }

  changeEmailOrMobile() {
    this.useEmail = !this.useEmail;
    this.loginForm.get("isEmail")?.setValue(this.useEmail);
  }

  login(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.busyLogin = this.authService.login(new LoginRequest().copy(this.loginForm, this.useEmail)).subscribe({
        next: (response) => {
          let accessTokenResponse: AccessTokenResponse = <AccessTokenResponse>response;
          if (accessTokenResponse) {
            localStorage.setItem('access_token', accessTokenResponse.accessToken)
            localStorage.setItem('refresh_token', accessTokenResponse.refreshToken)
            localStorage.setItem('user_details', JSON.stringify(accessTokenResponse))
          }
          !!this.redirectUrl ? this.router.navigate([this.redirectUrl]) : this.router.navigate(['home'])
        },
        error: (errorResponse: any) => {
          if (errorResponse?.error?.message) {
            this.alert = new Alert(errorResponse?.error?.message, AlertType.ERROR);
            console.log(errorResponse?.error?.message);
          } else {
            this.alert = new Alert('Login Failed', AlertType.ERROR);
            console.log("Login Failed");
          }
        }
      });
      this.submitted = false;
    }
  }
}
