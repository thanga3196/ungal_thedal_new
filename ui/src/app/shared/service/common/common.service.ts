import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UrlConstant} from 'src/app/core/constants/url.constant';
import {HttpService} from '../http/http.service';
import {Theme} from "../../models/Theme";
import {Constant} from "../../../core/constants/constant";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private showMenu = new BehaviorSubject<boolean>(false);
  private showPreLoader = new BehaviorSubject<boolean>(true);
  private showNav = new BehaviorSubject<boolean>(true);
  private theme = new BehaviorSubject<Theme>(Constant.defaultTheme);
  private lang = new BehaviorSubject<string>("eng");

  constructor(@Inject(HttpService) private httpService: HttpService) {
    this.initTheme("theme", Constant.defaultTheme);
    this.init("lang", "eng");
  }

  initTheme(key: string, value: Theme) {
    let item = localStorage.getItem(key);
    if (!item)
      localStorage.setItem(key, JSON.stringify(value));
  }

  init(key: string, value: string) {
    let item = localStorage.getItem(key);
    if (!item)
      localStorage.setItem(key, value);
  }

  setShowMenu(value: boolean) {
    this.showMenu.next(value);
  }

  getShowMenu() {
    return this.showMenu.asObservable();
  }

  setShowPreLoader(value: boolean) {
    this.showPreLoader.next(value);
  }

  getShowPreLoader() {
    return this.showPreLoader.asObservable();
  }

  setShowNav(value: boolean) {
    this.showNav.next(value);
  }

  getShowNav() {
    return this.showNav.asObservable();
  }

  getSharedDetails() {
    return this.httpService.get(UrlConstant.sharedDetails);
  }

  getSearchDropDownDetails() {
    return this.httpService.get(UrlConstant.searchDropDownDetails);
  }

  getCityList() {
    return this.httpService.get(UrlConstant.cityList);
  }

  getDistrictList() {
    return this.httpService.get(UrlConstant.districtList);
  }

  getStateList() {
    return this.httpService.get(UrlConstant.stateList);
  }

  getCountryList() {
    return this.httpService.get(UrlConstant.countryList);
  }

  getRegionList() {
    return this.httpService.get(UrlConstant.regionList);
  }

  getCategoryList() {
    return this.httpService.get(UrlConstant.categoryList);
  }

  getSubCategoryList() {
    return this.httpService.get(UrlConstant.subCategoryList);
  }

  getIconList() {
    return this.httpService.get(UrlConstant.iconList);
  }

  getStatus() {
    return this.httpService.get(UrlConstant.serverStatus);
  }

  getLang() {
    let lang = localStorage.getItem("lang");
    if (lang)
      this.setLang(lang)
    return this.lang.asObservable();
  }

  setLang(value: string) {
    localStorage.setItem("lang", value);
    this.lang.next(value);
  }

  getTheme() {
    let theme = localStorage.getItem("theme");
    if (theme)
      this.setTheme(JSON.parse(theme));
    return this.theme.asObservable();
  }

  setTheme(value: Theme) {
    localStorage.setItem("theme", JSON.stringify(value));
    this.theme.next(value);
  }
}
