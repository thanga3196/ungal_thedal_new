import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/service/common/common.service';
import {Theme} from "../../../shared/models/Theme";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {
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
