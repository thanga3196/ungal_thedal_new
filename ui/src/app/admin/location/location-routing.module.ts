import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegionSearchComponent} from "./components/region/region-search/region-search.component";
import {RegionComponent} from "./components/region/region.component";
import {CountrySearchComponent} from "./components/country/country-search/country-search.component";
import {CountryComponent} from "./components/country/country.component";
import {StateSearchComponent} from "./components/state/state-search/state-search.component";
import {StateComponent} from "./components/state/state.component";
import {DistrictSearchComponent} from "./components/district/district-search/district-search.component";
import {DistrictComponent} from "./components/district/district.component";
import {CitySearchComponent} from "./components/city/city-search/city-search.component";
import {CityComponent} from "./components/city/city.component";

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'region-search'
},
  {path: 'region-search', component: RegionSearchComponent},
  {path: 'region/:id', component: RegionComponent},
  {path: 'country-search', component: CountrySearchComponent},
  {path: 'country/:id', component: CountryComponent},
  {path: 'state-search', component: StateSearchComponent},
  {path: 'state/:id', component: StateComponent},
  {path: 'district-search', component: DistrictSearchComponent},
  {path: 'district/:id', component: DistrictComponent},
  {path: 'city-search', component: CitySearchComponent},
  {path: 'city/:id', component: CityComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule {
}
