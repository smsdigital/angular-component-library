import { Component, Output, EventEmitter, Input, HostListener, HostBinding, OnInit } from '@angular/core';

export type CheckboxState = 'checked' | 'intermediate' | 'unchecked';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  private isInitialized: boolean;

  @Output('stateChanged')
  stateChanged: EventEmitter<CheckboxState>;

  @HostBinding('class')
  private state_: CheckboxState;

  @HostBinding('class.disabled')
  private disabled_: boolean;

  @Input('disabled')
  set disabled(value: boolean) {
    this.disabled_ = value;
  }

  get disabled(): boolean {
    return this.disabled_;
  }

  @Input('state')
  set state(value: CheckboxState) {
    this.state_ = value;
    if (this.isInitialized) {
      this.stateChanged.next(this.state_);
    }
  }

  get state(): CheckboxState {
    return this.state_;
  }

  get isChecked(): boolean {
    return this.state === 'checked';
  }

  set isIntermediate(value: boolean) {
    this.state = 'intermediate';
  }

  get isIntermediate(): boolean {
    return this.state === 'intermediate';
  }

  constructor() {
    this.disabled = false;
    this.state = 'unchecked';
    this.isInitialized = false;
    this.stateChanged = new EventEmitter<CheckboxState>();
  }

  ngOnInit() {
    this.isInitialized = true;
  }

  @HostListener('click')
  clicked() {
    if (this.disabled) {
      return;
    }
    if (this.state === 'unchecked') {
      this.state = 'checked';
    } else {
      this.state = 'unchecked';
    }
  }
}
