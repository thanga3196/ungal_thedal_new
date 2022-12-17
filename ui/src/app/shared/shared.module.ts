import {NgModule} from '@angular/core';
import {TranslatePipe} from "./pipes/translate.pipe";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {SideMenuComponent} from "./components/side-menu/side-menu.component";
import {AutoCompleteComponent} from "./components/auto-complete/auto-complete.component";
import {PreLoaderComponent} from "./components/pre-loader/pre-loader.component";
import {IconPickerComponent} from "./components/icon-picker/icon-picker.component";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    AutoCompleteComponent,
    SideMenuComponent,
    PreLoaderComponent,
    IconPickerComponent
  ],
  exports: [TranslatePipe,
    HeaderComponent,
    FooterComponent,
    AutoCompleteComponent,
    SideMenuComponent,
    PreLoaderComponent,
    IconPickerComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
  ],
})
export class SharedModule {
}
