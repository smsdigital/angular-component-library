import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss'],
  host: {
    '[attr.tabindex]': '0',
  }
})
export class RadiobuttonComponent {

  private checked_: boolean;

  @Input()
  @HostBinding('class.disabled')
  disabled: boolean;

  @Input()
  value: any;

  @Output() selected: EventEmitter<RadiobuttonComponent>;

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  @HostListener('click', ['$event'])
  private toggle(event: Event): void {
    if (!this.disabled && !this.checked) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.selected.next(this.value);
    }
  }

  set checked(value: boolean) {
    this.checked_ = value;
  }

  @HostBinding('class.checked')
  get checked(): boolean {
    return this.checked_;
  }

  constructor() {
    this.disabled = false;
    this.selected = new EventEmitter<RadiobuttonComponent>();
  }

}
