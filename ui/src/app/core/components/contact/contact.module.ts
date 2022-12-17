import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgBusyModule} from 'ng-busy';
import {SharedModule} from "../../../shared/shared.module";
@NgModule({
  declarations: [
    ContactComponent,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgBusyModule,
  ]
})
export class ContactModule { }
