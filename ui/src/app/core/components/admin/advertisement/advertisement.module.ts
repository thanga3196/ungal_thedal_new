import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdvertisementRoutingModule} from './advertisement-routing.module';
import {AdvertisementComponent} from './advertisement.component';
import {NgBusyModule} from 'ng-busy';
import {AdHomeCarouselComponent} from "./ad-home-carousel/ad-home-carousel.component";
import {
  AdHomeCarouselSearchComponent
} from "./ad-home-carousel/ad-home-carousel-search/ad-home-carousel-search.component";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
  declarations: [
    AdvertisementComponent,
    AdHomeCarouselComponent,
    AdHomeCarouselSearchComponent
  ],
  imports: [
    CommonModule,
    NgBusyModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    AdvertisementRoutingModule,
    DropdownModule,
    TabViewModule,
    TableModule,
    SharedModule
  ],
  providers: [ConfirmationService]
})
export class AdvertisementModule {
}
