import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { WeekDaysComponent } from './components/week-days/week-days.component';
import { SocialMediaSearchComponent } from './components/social-media/social-media-search/social-media-search.component';
import { WeekDaysSearchComponent } from './components/week-days/week-days-search/week-days-search.component';
import {NgBusyModule} from "ng-busy";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SharedModule} from "src/app/shared/shared.module";


@NgModule({
  declarations: [
    GeneralComponent,
    SocialMediaComponent,
    WeekDaysComponent,
    SocialMediaSearchComponent,
    WeekDaysSearchComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    NgBusyModule,
    ConfirmDialogModule,
    SharedModule
  ]
})
export class GeneralModule { }
