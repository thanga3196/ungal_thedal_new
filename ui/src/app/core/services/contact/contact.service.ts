import { Inject, Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/service/http/http.service';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { Contact } from '../../models/contact/Contact';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(@Inject(HttpService) private httpService: HttpService) {

  }

  save(contact: Contact) {
    return this.httpService.post(UrlConstant.saveContact, contact);
  }
}
98