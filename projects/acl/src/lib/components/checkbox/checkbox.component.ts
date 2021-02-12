import { Component, Output, EventEmitter, Input, HostListener, HostBinding, OnInit, OnDestroy } from '@angular/core';

export type CheckboxState = 'checked' | 'intermediate' | 'unchecked';

@Component({
  selector: 'smsdigital-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  host: {
    '[attr.tabindex]': '0',
  }
})
export class CheckboxComponent implements OnInit, OnDestroy {

  private isInitialized: boolean;
  private childCheckboxes: this[];

  @Output()
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
    if (this.state_ !== value) {
      this.state_ = value;
      if (this.isInitialized) {
        this.stateChanged.next(this.state_);
      }
    }
  }

  get state(): CheckboxState {
    return this.state_;
  }

  get isChecked(): boolean {
    return this.state === 'checked';
  }

  get isIntermediate(): boolean {
    return this.state === 'intermediate';
  }

  get isUnchecked(): boolean {
    return this.state === 'unchecked';
  }

  @Input()
  parent: this;

  constructor() {
    this.isInitialized = false;
    this.disabled = false;
    this.childCheckboxes = [];
    this.state = 'unchecked';
    this.stateChanged = new EventEmitter<CheckboxState>();
  }

  ngOnInit(): void {
    this.isInitialized = true;
    this.registerSelfOnParent();
  }

  ngOnDestroy(): void {
    this.unregisterSelfOnParent();
  }

  registerSelfOnParent(): void {
    if (this.parent) {
      this.parent.registerChild(this);
    }
  }

  unregisterSelfOnParent(): void {
    if (this.parent) {
      this.parent.unregisterChild(this);
    }
  }

  registerChild(checkbox: this): void {
    this.childCheckboxes.push(checkbox);
  }

  unregisterChild(checkbox: this): void {
    const index: number = this.childCheckboxes.indexOf(checkbox);
    this.childCheckboxes.splice(index, 1);
  }

  private calculateNewState(): CheckboxState {
    const everyChecked = this.childCheckboxes.every((box) => box.isChecked);
    if (everyChecked) {
      return 'checked';
    }
    const someChecked = this.childCheckboxes.some((box) => box.isChecked || box.isIntermediate);
    if (!everyChecked && !someChecked) {
      return 'unchecked';
    }
    return 'intermediate';
  }

  childHasChanged(): void {
    this.state_ = this.calculateNewState();
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  @HostListener('click', ['$event'])
  private toggle(event: Event): void {
    if (!this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.setOwnState();
      this.notifyParentAboutChanges();
      this.setChildrenState();
    }
  }

  setOwnState(): void {
    if (this.state === 'unchecked') {
      this.state = 'checked';
    } else {
      this.state = 'unchecked';
    }
  }

  notifyParentAboutChanges(): void {
    if (this.parent) {
      this.parent.childHasChanged.call(this.parent);
      this.parent.notifyParentAboutChanges.call(this.parent);
    }
  }

  setChildrenState(): void {
    if (this.childCheckboxes.length > 0) {
      for (const childCheckbox of this.childCheckboxes) {
        childCheckbox.state = this.state;
        this.setChildrenState.call(childCheckbox);
      }
    }
  }
}
