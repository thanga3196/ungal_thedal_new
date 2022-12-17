import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertiseComponent } from './advertise.component';

const routes: Routes = [{ path: '', component: AdvertiseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertiseRoutingModule { }
