import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../shared/service/common/common.service";
import {Theme} from "../../../shared/models/Theme";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  lang: string = '';
  theme!: Theme;
  constructor(private commonService: CommonService) {
    this.commonService.setShowNav(true);
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

  ngAfterViewInit(): void {
    this.commonService.setShowPreLoader(false);
  }

  ngOnInit(): void {
  }

}
