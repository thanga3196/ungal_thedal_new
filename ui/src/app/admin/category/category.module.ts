import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryRoutingModule} from './category-routing.module';
import {CategoryComponent} from './category.component';
import {NgBusyModule} from "ng-busy";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DropdownModule} from "primeng/dropdown";
import {TabViewModule} from "primeng/tabview";
import {TableModule} from "primeng/table";
import {ConfirmationService, MessageService} from "primeng/api";
import {CategorySearchComponent} from "./components/category/category-search/category-search.component";
import {SubCategoryComponent} from "./components/sub-category/sub-category.component";
import {SubCategorySearchComponent} from "./components/sub-category/sub-category-search/sub-category-search.component";
import {Category1Component} from "./components/category/category1.component";
import {SharedModule} from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    CategoryComponent,
    Category1Component,
    CategorySearchComponent,
    SubCategoryComponent,
    SubCategorySearchComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    CategoryRoutingModule,
    NgBusyModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    DropdownModule,
    TabViewModule,
    TableModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class CategoryModule {
}
