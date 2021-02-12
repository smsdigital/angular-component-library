import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './components/button/button.component';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadiobuttonComponent } from './components/radiobutton/radiobutton.component';
import { RadiobuttonGroupComponent } from './components/radiobutton-group/radiobutton-group.component';

@NgModule({
  declarations: [ButtonComponent, ButtonGroupComponent, CheckboxComponent, RadiobuttonComponent, RadiobuttonGroupComponent],
  imports: [CommonModule],
  exports: [ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AclModule { }
