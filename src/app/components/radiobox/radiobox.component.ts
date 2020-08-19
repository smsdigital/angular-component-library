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

}
