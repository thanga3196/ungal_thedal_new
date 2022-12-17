import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LocationRoutingModule} from './location-routing.module';
import {LocationComponent} from './location.component';
import {NgBusyModule} from "ng-busy";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {AdvertisementRoutingModule} from "../advertisement/advertisement-routing.module";
import {DropdownModule} from "primeng/dropdown";
import {TabViewModule} from "primeng/tabview";
import {TableModule} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {RegionSearchComponent} from "./region/region-search/region-search.component";
import {RegionComponent} from "./region/region.component";
import {CountrySearchComponent} from "./country/country-search/country-search.component";
import {CountryComponent} from "./country/country.component";
import {StateSearchComponent} from "./state/state-search/state-search.component";
import {DistrictSearchComponent} from "./district/district-search/district-search.component";
import {DistrictComponent} from "./district/district.component";
import {CitySearchComponent} from "./city/city-search/city-search.component";
import {CityComponent} from "./city/city.component";
import {StateComponent} from "./state/state.component";
import {SharedModule} from "../../../../shared/shared.module";


@NgModule({
  declarations: [
    LocationComponent,
    RegionSearchComponent,
    RegionComponent,
    CountrySearchComponent,
    CountryComponent,
    StateSearchComponent,
    StateComponent,
    CountryComponent,
    DistrictSearchComponent,
    DistrictComponent,
    CitySearchComponent,
    CityComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
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
export class LocationModule {
}
