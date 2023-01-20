import {FormGroup} from '@angular/forms';
import {Country} from "src/app/admin/location/models/Country";

export function emailOrMobileValidator(email: string, mobile: string, country: string, isEmail: string, countryList: string): any | null {
  return (formGroup: FormGroup) => {
    const emailControl = formGroup.controls[email];
    const countryControl = formGroup.controls[country];
    const countryListControl = formGroup.controls[countryList];
    const mobileControl = formGroup.controls[mobile];
    const isEmailControl = formGroup.controls[isEmail];
    switch (isEmailControl.value) {
      case true:
        if (emailControl.value === '')
          formGroup.controls[mobile].setErrors({required: true, msg: 'Email is required'})
        else if (!validEmail(emailControl.value))
          formGroup.controls[mobile].setErrors({required: true, msg: 'Email is invalid'})
        else formGroup.controls[mobile].setErrors(null)
        break;
      case false:
        if (countryControl.value === '')
          formGroup.controls[mobile].setErrors({required: true, msg: 'Country Code is required'})
        else if (mobileControl.value === '')
          formGroup.controls[mobile].setErrors({required: true, msg: 'Mobile is required'})
        else if (!validMobileNbr(countryControl.value, mobileControl.value, countryListControl.value))
          formGroup.controls[mobile].setErrors({required: true, msg: 'Mobile is invalid'})
        else
          formGroup.controls[mobile].setErrors(null)
        break;
      default:
        formGroup.controls[mobile].setErrors(null)
    }
  }

  function validEmail(email: string) {
    var re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  }

  function validMobileNbr(countryCde: string, mobile: string, countryList: Country[]) {
    var value = countryCde + mobile
    var regex = countryList.find((val) => val.mobileCde === countryCde)?.mobileRegex
    if (regex) {
      var re = new RegExp(regex)
      return re.test(value)
    }
    return false;
  }
}
