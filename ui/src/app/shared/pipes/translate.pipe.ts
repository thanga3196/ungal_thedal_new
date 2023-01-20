import {Inject, Pipe, PipeTransform} from '@angular/core';
import {HttpService} from "src/app/shared/services/http/http.service";
import en from "src/assets/i18n/en.json";
import ta from "src/assets/i18n/ta.json";

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  en: any = en;
  ta: any = ta;

  constructor(@Inject(HttpService) private httpService: HttpService) {
  }

  transform(value: string, lang: string): string {
    let response: string = '';
    switch (lang) {
      case "en":
        response = (this.en)[value];
        break;
      case "ta":
        response = (this.ta)[value];
        break;
      default:
        response = (this.en)[value];
    }
    return response;
  }
}
