import { Component, Input, ViewChildren, Output, EventEmitter, HostBinding } from '@angular/core';
import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';

@Component({
  selector: 'app-radiobutton-group',
  templateUrl: './radiobutton-group.component.html',
  styleUrls: ['./radiobutton-group.component.scss']
})
export class RadiobuttonGroupComponent {

  private selectedOption_: ICheckboxOption;

  set selectedOption(value: ICheckboxOption) {
    if (value !== this.selectedOption_) {
      this.selectedOption_ = value;
      this.optionSelected.next(value);
    }
  }

  get selectedOption(): ICheckboxOption {
    return this.selectedOption_;
  }

  @Input('disabled')
  @HostBinding('class.disabled')
  disabled: boolean;

  @ViewChildren('radiobutton')
  radiobuttons: RadiobuttonComponent[];

  @Output('optionSelected')
  optionSelected: EventEmitter<ICheckboxOption>;

  @Input('stackedList')
  @HostBinding('class.stackedList')
  stackedList: boolean;

  @Input('options')
  options: ICheckboxOption[];

  constructor() {
    this.options = [];
    this.stackedList = true;
    this.disabled = false;
    this.optionSelected = new EventEmitter<ICheckboxOption>();
  }

  optionClicked(selectedRadiobutton: RadiobuttonComponent): void {
    this.uncheckOtherRadioboxes(selectedRadiobutton);
    this.selectedOption = selectedRadiobutton.option;
  }

  private uncheckOtherRadioboxes(selectedRadiobutton: RadiobuttonComponent): void {
    for (const radiobutton of this.radiobuttons) {
      if (radiobutton !== selectedRadiobutton) {
        radiobutton.checked = false;
      }
    }
  }

}

interface ICheckboxOption {
  value: any;
  label: string;
}