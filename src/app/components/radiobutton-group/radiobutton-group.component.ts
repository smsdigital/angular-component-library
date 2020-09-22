import {
  Component,
  Input, Output,
  EventEmitter,
  HostBinding,
  AfterContentInit,
  ContentChildren,
  QueryList,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';

@Component({
  selector: 'app-radiobutton-group',
  templateUrl: './radiobutton-group.component.html',
  styleUrls: ['./radiobutton-group.component.scss']
})
export class RadiobuttonGroupComponent implements AfterContentInit, OnDestroy {

  @ContentChildren(RadiobuttonComponent) radiobuttons: QueryList<RadiobuttonComponent>;

  @Input() label: string;
  @Input() @HostBinding('class.disabled') disabled: boolean;
  @Input() @HostBinding('class.stackedList') stackedList: boolean;
  @Input() preSelectedOptionValue: any;

  @Output() optionSelected: EventEmitter<any>;

  private selectedOption_: any;
  private destroySubject$: Subject<void>;

  set selectedOption(value: any) {
    this.selectedOption_ = value;
    this.optionSelected.next(value);
  }

  get selectedOption(): any {
    return this.selectedOption_;
  }

  constructor() {
    this.stackedList = false;
    this.disabled = false;
    this.destroySubject$ = new Subject();
    this.optionSelected = new EventEmitter<any>();
  }

  newRadioButtonSelected(newValue: any): void {
    this.radiobuttons.forEach((radioButtonComponent: RadiobuttonComponent) => {
      radioButtonComponent.checked = radioButtonComponent.value === newValue;
    });
    this.selectedOption = newValue;
  }

  ngAfterContentInit(): void {
    this.listenToChildren();
    this.checkForPreSelection();
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

  private listenToChildren(): void {
    this.radiobuttons.forEach((radiobutton) => {
      radiobutton.selected
        .pipe(takeUntil(this.destroySubject$))
        .subscribe(this.newRadioButtonSelected.bind(this));
    });
  }

  private checkForPreSelection(): void {
    if (this.preSelectedOptionValue) {
      this.radiobuttons.forEach((radioButtonComponent) => {
        if (radioButtonComponent.value === this.preSelectedOptionValue) {
          radioButtonComponent.checked = true;
        } else {
          radioButtonComponent.checked = false;
        }
      });
    }
  }
}
