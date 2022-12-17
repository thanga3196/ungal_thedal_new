import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faBars,
  faBell,
  faBlog,
  faLanguage,
  faMagnifyingGlass,
  faPalette,
  faRightFromBracket,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {MenuConstant} from 'src/app/core/constants/menu.constant';
import {CommonService} from 'src/app/shared/service/common/common.service';
import {AuthService} from "../../../core/services/auth/auth.service";
import {Router} from "@angular/router";
import {Theme} from "../../models/Theme";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faAngleRight: IconDefinition = faAngleRight;
  faAngleLeft: IconDefinition = faAngleLeft;
  faAngleDown: IconDefinition = faAngleDown;
  faBell: IconDefinition = faBell;
  faLanguage: IconDefinition = faLanguage;
  faPalette: IconDefinition = faPalette;
  faBars: IconDefinition = faBars;
  faRightFromBracket: IconDefinition = faRightFromBracket;
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;
  faBlog: IconDefinition = faBlog;
  menuList: any[] = MenuConstant.menuList;
  profileMenuList: any[] = MenuConstant.profileMenuList;
  adminMenuList: any[] = MenuConstant.adminMenuList;
  langList: any[] = MenuConstant.otherSettingsList[1].children;
  paletteList: any[] = MenuConstant.otherSettingsList[0].children;
  messageNonReadCount: number = 0;
  lang: string = '';
  theme!: Theme;
  showProfile: boolean = false;
  showAdministration: boolean = false;
  showPalette: boolean = false;
  showLang: boolean = false;
  showService: boolean = true;
  @ViewChild('servicesList') servicesList: ElementRef | undefined;

  constructor(private commonService: CommonService, private authService: AuthService, private router: Router, private elementRef: ElementRef) {
    this.commonService.getSharedDetails().subscribe((data: any) => {
      this.messageNonReadCount = data['contactCountByReadInd'];
    });
    this.initSubscription();
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  handleOutsideClick(event: any) {
    if (event.target.className && typeof event.target.className.includes !== 'undefined' && !event.target.className.includes('profile-link'))
      this.showProfile = false;
    if (event.target.className && typeof event.target.className.includes!=='undefined'  && !event.target.className.includes('bar-link'))
      this.commonService.setShowMenu(false);
    if (event.target.className && typeof event.target.className.includes!=='undefined'  && !event.target.className.includes('admin-link'))
      this.showAdministration = false;
    if (event.target.className && typeof event.target.className.includes!=='undefined'  && !event.target.className.includes('palette-link'))
      this.showPalette = false;
    if (event.target.className && typeof event.target.className.includes!=='undefined'  && !event.target.className.includes('lang-link'))
      this.showLang = false;
    if (event.target.className && typeof event.target.className.includes!=='undefined'  && !event.target.className.includes('service-link')) {
      this.menuList.find((obj) => {
        return obj.name === 'Services'
      }).clicked = false
    }
    this.collapseAllAdminMenu();
  }

  collapseAllAdminMenu() {
    this.adminMenuList[0].children.forEach((value: any) => {
      value.clicked = false;
    });
  }

  expandAdminMenu(item: any, event: any) {
    event.stopPropagation();
    this.collapseAllAdminMenu();
    item.clicked = !item.clicked;
  }

  initSubscription() {
    this.commonService.getTheme().subscribe(value => {
      this.theme = value;
    });
    this.commonService.getLang().subscribe(value => {
      this.lang = value;
    });
  }

  ngOnInit(): void {
  }

  openMenu() {
    this.commonService.setShowMenu(true);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }

  changePalette(theme: Theme) {
    this.commonService.setTheme(theme);
  }

  changeLanguage(lang: string) {
    this.commonService.setLang(lang);
  }

  isActive(route: string) {
    return this.router.url === "/" + route
  }

  scrollLeft() {
    // @ts-ignore
    this.servicesList.nativeElement.scrollLeft = this.servicesList?.nativeElement.scrollLeft + 210
  }

  scrollRight() {
    // @ts-ignore
    this.servicesList.nativeElement.scrollLeft = this.servicesList?.nativeElement.scrollLeft - 210
  }
}
