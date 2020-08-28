import { Component, HostBinding, HostListener, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss'],
})
export class RadiobuttonComponent implements OnInit {

  private checked_: boolean;

  @Input('disabled')
  @HostBinding('class.disabled')
  disabled: boolean;

  @Input('option')
  option: ICheckboxOption;

  @Input('preSelected')
  preSelected: boolean;

  @Output('stateChanged')
  stateChanged: EventEmitter<RadiobuttonComponent>;

  @HostListener('click')
  clicked(): void {
    if (!this.disabled) {
      this.checked = true;
      this.stateChanged.next(this);
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
    this.checked = false;
    this.disabled = false;
    this.stateChanged = new EventEmitter<RadiobuttonComponent>();
  }

  ngOnInit() {
    this.checkForPreSelection();
  }

  private checkForPreSelection() {
    if (this.preSelected === true) {
      this.checked = true;
    }
  }

}

interface ICheckboxOption {
  value: any;
  label: string;
}