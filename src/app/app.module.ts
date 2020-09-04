import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadiobuttonComponent } from './components/radiobutton/radiobutton.component';
import { RadiobuttonGroupComponent } from './components/radiobutton-group/radiobutton-group.component';
import { ButtonComponent } from './components/button/button.component';
import { ButtonGroupComponent } from './components/button-group/button-group.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckboxComponent,
    RadiobuttonComponent,
    RadiobuttonGroupComponent,
    ButtonComponent,
    ButtonGroupComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
