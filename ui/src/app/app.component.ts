import {Component} from '@angular/core';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {CommonService} from './shared/service/common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faCoffee = faCoffee;
  showNav: boolean = true;

  constructor(private commonService: CommonService) {
    this.commonService.getShowNav().subscribe(value => {
      this.showNav = value;
    });
  }
}
