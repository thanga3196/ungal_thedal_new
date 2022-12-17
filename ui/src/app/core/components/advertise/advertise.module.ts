import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertiseRoutingModule } from './advertise-routing.module';
import { AdvertiseComponent } from './advertise.component';
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [
    AdvertiseComponent
  ],
  imports: [
    CommonModule,
    AdvertiseRoutingModule,
    SharedModule
  ]
})
export class AdvertiseModule { }
