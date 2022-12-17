import {Component, OnInit} from '@angular/core';
import {CommonService} from 'src/app/shared/service/common/common.service';
import {Theme} from "../../models/Theme";

@Component({
  selector: 'pre-loader',
  templateUrl: './pre-loader.component.html',
  styleUrls: ['./pre-loader.component.scss']
})
export class PreLoaderComponent implements OnInit {
  theme!: Theme;
  showPreLoader: boolean = true;

  constructor(private commonService: CommonService) {
    this.commonService.getShowPreLoader().subscribe(value => {
      this.showPreLoader = value;
    });
    this.commonService.getTheme().subscribe(value => {
      this.theme = value;
    });
  }

  ngOnInit(): void {
  }

}
