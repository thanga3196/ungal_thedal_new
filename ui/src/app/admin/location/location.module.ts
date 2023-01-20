import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LocationRoutingModule} from './location-routing.module';
import {LocationComponent} from './location.component';
import {NgBusyModule} from "ng-busy";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DropdownModule} from "primeng/dropdown";
import {TabViewModule} from "primeng/tabview";
import {TableModule} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {SharedModule} from "src/app/shared/shared.module";
import { RegionSearchComponent } from './components/region/region-search/region-search.component';
import {RegionComponent} from "./components/region/region.component";
import {CountrySearchComponent} from "./components/country/country-search/country-search.component";
import {StateSearchComponent} from "./components/state/state-search/state-search.component";
import {CityComponent} from "./components/city/city.component";
import {DistrictSearchComponent} from "./components/district/district-search/district-search.component";
import {DistrictComponent} from "./components/district/district.component";
import {StateComponent} from "./components/state/state.component";
import {CountryComponent} from "./components/country/country.component";
import {CitySearchComponent} from "./components/city/city-search/city-search.component";


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
    DropdownModule,
    TabViewModule,
    TableModule,
    SharedModule
  ],
  providers: [ConfirmationService]
})
export class LocationModule {
}
