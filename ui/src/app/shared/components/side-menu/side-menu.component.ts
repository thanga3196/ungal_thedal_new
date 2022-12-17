import {Component, OnInit} from '@angular/core';
import {MenuConstant} from 'src/app/core/constants/menu.constant';
import {faAngleDown, faAngleUp, faClose, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import {CommonService} from 'src/app/shared/service/common/common.service';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        left: '0px',
      })),
      state('closed', style({
        left: '-300px',
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class SideMenuComponent implements OnInit {
  menuList: any[] = MenuConstant.menuList;
  otherSettingsList: any[] = MenuConstant.otherSettingsList;
  faAngleDown: IconDefinition = faAngleDown;
  faAngleUp: IconDefinition = faAngleUp;
  faClose: IconDefinition = faClose;
  showMenu: boolean = true;

  constructor(private commonService: CommonService) {
    this.commonService.getShowMenu().subscribe(value => {
      this.showMenu = value;
    });
  }

  ngOnInit(): void {
  }

  closeMenu(menu: any) {
    if (menu == undefined || menu.children.length == 0)
      this.commonService.setShowMenu(false);
  }

  expandOrCollapse(item: any, event: any) {
    event.stopPropagation()
    if (item.children.length > 0)
      item.clicked = !item.clicked
  }

  changePaletteOrLanguage(setting: any) {
    if (setting.hasOwnProperty("theme")) {
      this.commonService.setTheme(setting.theme);
    } else {
      this.commonService.setLang(setting.lang);
    }
  }
}
