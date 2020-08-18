import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioboxComponent } from './components/radiobox/radiobox.component';
import { RadioboxGroupComponent } from './components/radiobox-group/radiobox-group.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckboxComponent,
    RadioboxComponent,
    RadioboxGroupComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
