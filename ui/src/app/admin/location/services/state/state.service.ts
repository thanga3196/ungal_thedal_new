import {Inject, Injectable} from '@angular/core';
import {UrlConstant} from 'src/app/core/constants/url.constant';
import {State} from 'src/app/admin/location/models/State';
import {HttpService} from 'src/app/shared/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(@Inject(HttpService) private httpService: HttpService) {

  }

  getById(state: State) {
    return this.httpService.post(UrlConstant.getStateById, state);
  }

  list(state: State) {
    return this.httpService.post(UrlConstant.listState, state);
  }

  listDistrictByState(state: State) {
    return this.httpService.post(UrlConstant.listDistrictByState, state);
  }

  save(state: State) {
    return this.httpService.post(UrlConstant.saveState, state);
  }

  delete(state: State) {
    return this.httpService.post(UrlConstant.deleteState, state);
  }
}
