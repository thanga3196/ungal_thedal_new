import {Inject, Injectable} from '@angular/core';
import {UrlConstant} from 'src/app/core/constants/url.constant';
import {Category} from 'src/app/core/models/admin/category/Category';
import {HttpService} from 'src/app/shared/service/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(@Inject(HttpService) private httpService: HttpService) {

  }

  getById(category: Category) {
    return this.httpService.post(UrlConstant.getCategoryById, category);
  }

  getIconList() {
    return this.httpService.get(UrlConstant.iconList)
  }

  list(category: Category) {
    return this.httpService.post(UrlConstant.listCategory, category);
  }

  save(category: Category) {
    return this.httpService.post(UrlConstant.saveCategory, category);
  }

  delete(category: Category) {
    return this.httpService.post(UrlConstant.deleteCategory, category);
  }
}
