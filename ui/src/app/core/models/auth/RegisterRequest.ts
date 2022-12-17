import {FormGroup} from "@angular/forms";

export class RegisterRequest {
  firstName: string = '';
  lastName: string = '';
  gender: string = '';
  mobile: string = '';
  email: string = '';
  password: string = '';

  copy(that: FormGroup): RegisterRequest {
    this.firstName = that.controls['firstName'].value
    this.lastName = that.controls['lastName'].value
    this.gender = that.controls['gender'].value
    this.mobile = that.controls['countryCde'].value + that.controls['mobile'].value
    this.email = that.controls['email'].value
    this.password = that.controls['password'].value
    return this
  }
}
