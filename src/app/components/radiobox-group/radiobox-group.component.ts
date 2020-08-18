import { Component, OnInit, Input, ViewChildren, Output, EventEmitter, HostBinding } from '@angular/core';
import { RadioboxComponent } from '../radiobox/radiobox.component';

@Component({
  selector: 'app-radiobox-group',
  templateUrl: './radiobox-group.component.html',
  styleUrls: ['./radiobox-group.component.scss']
})
export class RadioboxGroupComponent implements OnInit {

  private selectedOption_: string;

  set selectedOption(value: string) {
    if (value !== this.selectedOption_) {
      this.selectedOption_ = value;
      this.optionSelected.next(value);
    }
  }

  get selectedOption(): string {
    return this.selectedOption_;
  }

  @ViewChildren('radiobox')
  radioboxen: RadioboxComponent[];

  @Output('optionSelected')
  optionSelected: EventEmitter<string>;

  @Input('stackedList')
  @HostBinding('class.stackedList')
  stackedList: boolean;

  @Input('options')
  options: string[];

  constructor() {
    this.options = [];
    this.stackedList = true;
    console.log('stackedList1:', this.stackedList);
    this.optionSelected = new EventEmitter<string>();
  }

  ngOnInit() {
    console.log('stackedList2:', this.stackedList);
  }

  optionClicked(selectedRadiobox: RadioboxComponent): void {
    console.log('optionSelected:', selectedRadiobox.name);
    this.uncheckOtherRadioboxes(selectedRadiobox);
    this.selectedOption = selectedRadiobox.name;
  }

  private uncheckOtherRadioboxes(selectedRadiobox: RadioboxComponent): void {
    for (const radiobox of this.radioboxen) {
      if (radiobox !== selectedRadiobox) {
        radiobox.checked = false;
      }
    }
  }

}
