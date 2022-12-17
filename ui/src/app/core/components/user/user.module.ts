import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {ProfileComponent} from './profile/profile.component';
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule {
}
