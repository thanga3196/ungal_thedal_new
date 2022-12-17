import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faPhone, faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { ContactService } from 'src/app/core/services/contact/contact.service';
import { Alert } from '../../models/shared/Alert';
import { AlertType } from '../../enums/alert-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Theme} from "../../../shared/models/Theme";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {
  busySending!: Subscription;
  alert!: Alert;
  showAlert: boolean = false;
  faPhone: IconDefinition = faPhone;
  faEnvelope: IconDefinition = faEnvelope;
  faWhatsApp: IconDefinition = faWhatsapp;
  contactForm!: FormGroup;
  submitted: boolean = false;
  lang: string = '';
  theme!: Theme;

  constructor(private commonService: CommonService, private contactService: ContactService) {
    this.commonService.setShowNav(true);
    this.initSubscription();
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
    this.contactForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]),
        email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(250)]),
        subject: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(100)]),
        message: new FormControl('', [Validators.required, Validators.minLength(30), Validators.maxLength(500)])
      }
    );
  }
  ngAfterViewInit(): void {
    this.commonService.setShowPreLoader(false);
  }

  ngOnInit(): void {
  }

  messageCount(): number {
    let control: any = this.contactForm.controls["message"];
    let maxCount: number = 500;
    if (control.value) {
      return maxCount - control.value.length
    }
    return maxCount;
  }

  send(): void {
    this.submitted = true;
    if (this.contactForm.valid) {
      this.busySending = this.contactService.save(this.contactForm.value).subscribe({
        next: (response) => {
          this.showAlert = true;
          let contact: any = response;
          if (contact?.id > 0)
            this.alert = new Alert("Your message sent successfully.", AlertType.SUCCESS);
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
    this.alert = new Alert('', AlertType.SUCCESS);
    this.contactForm.reset();
  }
}
