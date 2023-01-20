import {Component, OnInit} from '@angular/core';
import {CommonService} from "src/app/shared/services/common/common.service";
import {Subscription} from "rxjs";
import {Theme} from "src/app/shared/models/Theme";

@Component({
  selector: 'app-social-media-search',
  templateUrl: './social-media-search.component.html',
  styleUrls: ['./social-media-search.component.scss']
})
export class SocialMediaSearchComponent implements OnInit {
  busyLoading!: Subscription;
  busySaving!: Subscription;
  busyDeleting!: Subscription;
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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.commonService.setShowPreLoader(false);
  }

}
