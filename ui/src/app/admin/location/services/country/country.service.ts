import {Inject, Injectable} from '@angular/core';
import {UrlConstant} from 'src/app/core/constants/url.constant';
import {Country} from 'src/app/admin/location/models/Country';
import {HttpService} from 'src/app/shared/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(@Inject(HttpService) private httpService: HttpService) {

  }

  getById(country: Country) {
    return this.httpService.post(UrlConstant.getCountryById, country);
  }

  list(country: Country) {
    return this.httpService.post(UrlConstant.listCountry, country);
  }

  listStateByCountry(country: Country) {
    return this.httpService.post(UrlConstant.listStateByCountry, country);
  }

  save(country: Country) {
    return this.httpService.post(UrlConstant.saveCountry, country);
  }

  delete(country: Country) {
    return this.httpService.post(UrlConstant.deleteCountry, country);
  }
}
