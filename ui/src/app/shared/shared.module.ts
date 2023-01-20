import {NgModule} from '@angular/core';
import {TranslatePipe} from "./pipes/translate.pipe";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {SideMenuComponent} from "./components/side-menu/side-menu.component";
import {AutoCompleteComponent} from "./components/auto-complete/auto-complete.component";
import {PreLoaderComponent} from "./components/pre-loader/pre-loader.component";
import {IconPickerComponent} from "./components/icon-picker/icon-picker.component";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from "@fortawesome/free-regular-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";

@NgModule({
  declarations: [
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    AutoCompleteComponent,
    SideMenuComponent,
    PreLoaderComponent,
    IconPickerComponent,
  ],
  exports: [TranslatePipe,
    HeaderComponent,
    FooterComponent,
    AutoCompleteComponent,
    SideMenuComponent,
    PreLoaderComponent,
    IconPickerComponent,
    FontAwesomeModule
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIconPacks(fas, far, fab)
  }
}
