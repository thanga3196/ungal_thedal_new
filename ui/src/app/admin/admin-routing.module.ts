import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'category'
  },
  {path: 'general', loadChildren: () => import('./general/general.module').then(m => m.GeneralModule)},
  {path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)},
  {path: 'location', loadChildren: () => import('./location/location.module').then(m => m.LocationModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
