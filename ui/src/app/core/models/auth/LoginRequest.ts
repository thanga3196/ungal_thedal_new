import {FormGroup} from "@angular/forms";

export class LoginRequest {
  userName: string = '';
  password: string = '';

  copy(that: FormGroup, useEmail: boolean): LoginRequest {
    this.userName = useEmail ? that.controls['email'].value : that.controls['countryCde'].value + that.controls['mobile'].value
    this.password = that.controls['password'].value
    return this
  }
}
