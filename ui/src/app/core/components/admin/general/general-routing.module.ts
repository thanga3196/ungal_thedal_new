import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SocialMediaSearchComponent} from "./social-media/social-media-search/social-media-search.component";
import {SocialMediaComponent} from "./social-media/social-media.component";
import {WeekDaysSearchComponent} from "./week-days/week-days-search/week-days-search.component";
import {WeekDaysComponent} from "./week-days/week-days.component";

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'social-media-search'
},
  {path: 'social-media-search', component: SocialMediaSearchComponent},
  {path: 'social-media/:id', component: SocialMediaComponent},
  {path: 'week-days-search', component: WeekDaysSearchComponent},
  {path: 'week-days/:id', component: WeekDaysComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule {
}
