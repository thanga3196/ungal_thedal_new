import { Inject, Injectable } from '@angular/core';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { District } from 'src/app/admin/location/models/District';
import { HttpService } from 'src/app/shared/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  constructor(@Inject(HttpService) private httpService: HttpService) {

  }

  getById(district: District) {
    return this.httpService.post(UrlConstant.getDistrictById, district);
  }

  list(district: District) {
    return this.httpService.post(UrlConstant.listDistrict, district);
  }

  save(district: District) {
    return this.httpService.post(UrlConstant.saveDistrict, district);
  }

  delete(district: District) {
    return this.httpService.post(UrlConstant.deleteDistrict, district);
  }
}
