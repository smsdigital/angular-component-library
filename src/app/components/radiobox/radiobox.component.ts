import { Component, OnInit, HostBinding, HostListener, Output, EventEmitter, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-radiobox',
  templateUrl: './radiobox.component.html',
  styleUrls: ['./radiobox.component.scss']
})
export class RadioboxComponent {

  private checked_: boolean;

  @Input('name')
  name: string;

  @Output('stateChanged')
  stateChanged: EventEmitter<RadioboxComponent>;

  @HostListener('click')
  clicked(): void {
    this.checked = true;
    this.stateChanged.next(this);
  }

  set checked(value: boolean) {
    this.checked_ = value;
  }

  @HostBinding('class.checked')
  get checked(): boolean {
    return this.checked_;
  }

  constructor() {
    this.checked = false;
    this.stateChanged = new EventEmitter<RadioboxComponent>();
  }

  /*private getGroup(): void {
    if (!RadioboxComponent.groups.has(this.groupName)) {
      RadioboxComponent.groups.set(this.groupName, []);
    }
    this.group = RadioboxComponent.groups.get(this.groupName);
  }*/



  /*private checkForDuplicatesError(): void {
    let checkedCount: number = 0;
    for (const radiobox of this.group) {
      if(radiobox.checked) {
        checkedCount++;
      }
    }
    if (checkedCount > 1) {
      console.error('There were more than 2 radioboxes checked on start!');
    }
  }*/

  /*private uncheckOtherRadioboxes(): void {
    for (const radiobox of this.group) {
      if (radiobox !== this) {
        radiobox.checked = false;
      }
    }
  }*/

}
