import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonService} from 'src/app/shared/service/common/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Theme} from "../../../shared/models/Theme";
import {Alert} from "../../models/shared/Alert";
import {AlertType} from "../../enums/alert-type";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {Constant} from 'src/app/core/constants/constant';
import {Country} from "../../models/admin/location/Country";
import {RegisterRequest} from "../../models/auth/RegisterRequest";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  registerForm!: FormGroup;
  busyRegister!: Subscription;
  submitted: boolean = false;
  showAlert: boolean = false;
  alert!: Alert;
  theme!: Theme;
  customMobilePattern: any = Constant.customMobilePattern;
  countryList: Country[] = [];

  //@ViewChild("loginVideo") loginVideo!: ElementRef;

  constructor(private commonService: CommonService, private elementRef: ElementRef, private authService: AuthService) {
    this.initForm();
    this.initSubscription();
    this.commonService.getCountryList().subscribe((data: any) => {
      this.countryList = data as Array<Country>;
      this.registerForm.get('countryList')?.setValue(this.countryList);
    });
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage = 'url("assets/images/background.jpg")';
    this.commonService.setShowPreLoader(false);
    //this.loginVideo.nativeElement.playbackRate = 0.5;
  }

  ngOnInit(): void {

  }

  initForm() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      gender: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      reEnterPassword: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      countryCde: new FormControl('+91', []),
      countryList: new FormControl([], []),
    });
  }

  initSubscription() {
    this.commonService.getTheme().subscribe(value => {
      this.theme = value;
    });
    this.commonService.setShowNav(false);
  }

  register() {
    this.submitted = true;
    if (this.registerForm.valid) {
      let loginRequest =
        this.busyRegister = this.authService.register(new RegisterRequest().copy(this.registerForm)).subscribe({
          next: (response: any) => {
            this.submitted = false;
            this.showAlert = true;
            this.registerForm.reset()
            this.alert = new Alert(response.message, response.type);
          },
          error: (errorResponse: any) => {
            console.log(errorResponse);
            this.showAlert = true;
            if (errorResponse?.error?.message) {
              console.log(errorResponse?.error?.message);
              this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
            } else this.alert = new Alert("Something went wrong. Please contact support team.", AlertType.ERROR);
          }
        });
      this.submitted = false;
    }
  }
}
