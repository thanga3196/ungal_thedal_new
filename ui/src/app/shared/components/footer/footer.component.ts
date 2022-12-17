import {Component, OnInit} from '@angular/core';
import {faFacebookF, faInstagram, faTwitter, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {MenuConstant} from 'src/app/core/constants/menu.constant';
import {ServerStatus} from 'src/app/core/models/shared/ServerStatus';
import {CommonService} from 'src/app/shared/service/common/common.service';
import {Theme} from "../../models/Theme";

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year!: number;
  faFacebookF = faFacebookF;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  menuList: any[] = MenuConstant.menuList;
  additionalMenuList: any[] = MenuConstant.additionalMenuList;
  serverStatus: ServerStatus = new ServerStatus(false, 'Not Connected');
  theme!: Theme;
  lang: string = '';

  constructor(private commonService: CommonService) {
    this.initSubscription();
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
    this.year = new Date().getFullYear();
    this.commonService.getStatus().subscribe(
      {
        next: (response) => {
          this.serverStatus = <any>response;
        },
        error: (errorResponse) => {
          if (errorResponse?.error?.message) {
            console.log(errorResponse.error.message + " " + errorResponse.status);
          } else {
            console.log(errorResponse);
          }
        }
      }
    );
  }
}
