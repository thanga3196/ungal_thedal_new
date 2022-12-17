import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdvertisementComponent} from './advertisement.component';
import {
  AdHomeCarouselSearchComponent
} from "./ad-home-carousel/ad-home-carousel-search/ad-home-carousel-search.component";
import {AdHomeCarouselComponent} from "./ad-home-carousel/ad-home-carousel.component";

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'ad-home-carousel-search'
},
  {path: 'ad-home-carousel-search', component: AdHomeCarouselSearchComponent},
  {path: 'ad-home-carousel/:id', component: AdHomeCarouselComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertisementRoutingModule {
}
