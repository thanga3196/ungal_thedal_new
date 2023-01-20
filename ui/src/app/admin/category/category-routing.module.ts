import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategorySearchComponent} from "./components/category/category-search/category-search.component";
import {Category1Component} from './components/category/category1.component';
import {SubCategorySearchComponent} from "./components/sub-category/sub-category-search/sub-category-search.component";
import {SubCategoryComponent} from "./components/sub-category/sub-category.component";

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'category-search'
},
  {path: 'category-search', component: CategorySearchComponent},
  {path: 'category/:id', component: Category1Component},
  {path: 'sub-category-search', component: SubCategorySearchComponent},
  {path: 'sub-category/:id', component: SubCategoryComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
