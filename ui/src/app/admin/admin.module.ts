import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AdminComponent} from './admin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import {NgBusyModule} from 'ng-busy';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {CategoryModule} from "./category/category.module";
import {LocationModule} from "./location/location.module";
import {GeneralModule} from "./general/general.module";
import {SharedModule} from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    NgBusyModule,
    TableModule,
    ConfirmDialogModule,
    SharedModule,
    TabViewModule,
    CategoryModule,
    LocationModule,
    GeneralModule
  ],
  providers: [ConfirmationService],
})
export class AdminModule {
}
