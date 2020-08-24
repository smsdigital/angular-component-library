import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private testValue = 5;

  log(value: any) {
    console.log(value);
  }

  buttonWasClicked() {
    console.log('button was clicked (outside event)!', this.testValue);
  }

}
