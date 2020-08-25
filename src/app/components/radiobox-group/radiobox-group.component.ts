import { Component, OnInit, Input, ViewChildren, Output, EventEmitter, HostBinding } from '@angular/core';
import { RadioboxComponent } from '../radiobox/radiobox.component';

@Component({
  selector: 'app-radiobox-group',
  templateUrl: './radiobox-group.component.html',
  styleUrls: ['./radiobox-group.component.scss']
})
export class RadioboxGroupComponent {

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

  @ViewChildren('radiobox')
  radioboxes: RadioboxComponent[];

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
    this.optionSelected = new EventEmitter<ICheckboxOption>();
  }

  optionClicked(selectedRadiobox: RadioboxComponent): void {
    this.uncheckOtherRadioboxes(selectedRadiobox);
    this.selectedOption = selectedRadiobox.option;
  }

  private uncheckOtherRadioboxes(selectedRadiobox: RadioboxComponent): void {
    for (const radiobox of this.radioboxes) {
      if (radiobox !== selectedRadiobox) {
        radiobox.checked = false;
      }
    }
  }

}

interface ICheckboxOption {
  value: any;
  label: string;
}