import { Inject, Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http/http.service';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(@Inject(HttpService) private httpService: HttpService) { }
}
