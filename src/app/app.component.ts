import { Component } from '@angular/core';
import { CheckboxState } from './components/checkbox/checkbox.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  log(value: any) {
    console.log(value);
  }

}
