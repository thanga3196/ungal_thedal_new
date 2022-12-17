import { Inject, Injectable } from '@angular/core';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { SubCategory } from 'src/app/core/models/admin/category/SubCategory';
import { HttpService } from 'src/app/shared/service/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  constructor(@Inject(HttpService) private httpService: HttpService) {

  }

  getById(subCategory: SubCategory) {
    return this.httpService.post(UrlConstant.getSubCategoryById, subCategory);
  }

  list(subCategory: SubCategory) {
    return this.httpService.post(UrlConstant.listSubCategory, subCategory);
  }

  save(subCategory: SubCategory) {
    return this.httpService.post(UrlConstant.saveSubCategory, subCategory);
  }

  delete(subCategory: SubCategory) {
    return this.httpService.post(UrlConstant.deleteSubCategory, subCategory);
  }
}
