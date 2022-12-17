import { Inject, Injectable } from '@angular/core';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { City } from 'src/app/core/models/admin/location/City';
import { HttpService } from 'src/app/shared/service/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(@Inject(HttpService) private httpService: HttpService) {

  }

  getById(city: City) {
    return this.httpService.post(UrlConstant.getCityById, city);
  }

  list(city: City) {
    return this.httpService.post(UrlConstant.listCity, city);
  }

  save(city: City) {
    return this.httpService.post(UrlConstant.saveCity, city);
  }

  delete(city: City) {
    return this.httpService.post(UrlConstant.deleteCity, city);
  }
}
