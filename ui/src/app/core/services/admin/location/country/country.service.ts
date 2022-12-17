import {Inject, Injectable} from '@angular/core';
import {UrlConstant} from 'src/app/core/constants/url.constant';
import {Country} from 'src/app/core/models/admin/location/Country';
import {HttpService} from 'src/app/shared/service/http/http.service';
import {Region} from "../../../../models/admin/location/Region";

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
