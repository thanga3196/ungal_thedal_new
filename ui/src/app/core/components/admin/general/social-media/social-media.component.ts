import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../../../shared/service/common/common.service";
import {Subscription} from "rxjs";
import {Theme} from "../../../../../shared/models/Theme";

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {
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
