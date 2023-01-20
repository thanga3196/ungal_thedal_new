import {Inject, Injectable} from '@angular/core';
import {UrlConstant} from 'src/app/core/constants/url.constant';
import {Region} from 'src/app/admin/location/models/Region';
import {HttpService} from 'src/app/shared/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  constructor(@Inject(HttpService) private httpService: HttpService) {

  }

  getById(region: Region) {
    return this.httpService.post(UrlConstant.getRegionById, region);
  }

  list(region: Region) {
    return this.httpService.post(UrlConstant.listRegion, region);
  }

  listCountryByRegion(region: Region) {
    return this.httpService.post(UrlConstant.listCountryByRegion, region);
  }

  save(region: Region) {
    return this.httpService.post(UrlConstant.saveRegion, region);
  }

  delete(region: Region) {
    return this.httpService.post(UrlConstant.deleteRegion, region);
  }
}
