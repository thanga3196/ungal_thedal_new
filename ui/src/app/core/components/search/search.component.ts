import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonService} from 'src/app/shared/service/common/common.service';
import {Theme} from "../../../shared/models/Theme";

@Component({
  selector: 'app-listing',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
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
