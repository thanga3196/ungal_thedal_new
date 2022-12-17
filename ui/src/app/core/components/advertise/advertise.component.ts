import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonService} from 'src/app/shared/service/common/common.service';
import {Theme} from "../../../shared/models/Theme";

@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.scss']
})
export class AdvertiseComponent implements OnInit, AfterViewInit {
  lang: string = '';
  theme!: Theme;
  constructor(private commonService: CommonService) {
    this.commonService.setShowNav(true);
    this.initSubscription();
  }

  ngAfterViewInit(): void {
    this.commonService.setShowPreLoader(false);
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

}
