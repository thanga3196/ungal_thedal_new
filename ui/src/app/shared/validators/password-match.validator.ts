import {FormGroup} from '@angular/forms';

export function passwordMatchValidator(password: string, retypePassword: string): any | null {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[password];
    const retypePasswordControl = formGroup.controls[retypePassword];

    if (retypePasswordControl.errors && !retypePasswordControl.errors['mustMatch']) {
      return;
    }
    if (passwordControl.value !== retypePasswordControl.value)
      retypePasswordControl.setErrors({mustMatch: true})
    else retypePasswordControl.setErrors(null)
  }
}
