import { Component, Output, EventEmitter, Input, HostListener, HostBinding, OnInit, OnDestroy } from '@angular/core';

export type CheckboxState = 'checked' | 'intermediate' | 'unchecked';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, OnDestroy {

  private isInitialized: boolean;
  private childCheckboxes: this[];

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

  @Input('parent')
  parent: this;

  constructor() {
    this.disabled = false;
    this.childCheckboxes = [];
    this.state = 'unchecked';
    this.isInitialized = false;
    this.stateChanged = new EventEmitter<CheckboxState>();
  }

  ngOnInit() {
    this.isInitialized = true;
    this.registerSelfOnParent();
  }

  ngOnDestroy() {
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
    console.log('child was registered');
  }

  unregisterChild(checkbox: this) {
    const index: number =this.childCheckboxes.indexOf(checkbox);
    this.childCheckboxes.splice(index, 1);
  }

  childHasChanged(): void {
    console.log('childHasChanged:', this.childCheckboxes);
    let checkedCount: number = 0;
    for (const childCheckbox of this.childCheckboxes) {
      if (childCheckbox.isChecked) {
        checkedCount++;
      }
    }
    if (checkedCount === 0) {
      this.state_ = 'unchecked';
    } else if (checkedCount === this.childCheckboxes.length) {
      this.state_ = 'checked';
    } else {
      this.state_ = 'intermediate';
    }
    console.log('new state:', this.state_)
  }

  @HostListener('click')
  clicked(): void {
    this.setOwnState();
    this.notifyParentAboutChanges();
    this.setChildrenState();
  }

  setOwnState(): void {
    if (this.disabled) {
      return;
    }
    if (this.state === 'unchecked') {
      this.state = 'checked';
    } else {
      this.state = 'unchecked';
    }
  }

  notifyParentAboutChanges(): void {
    if (this.parent) {
      this.parent.childHasChanged.call(this.parent);
    }
  }

  setChildrenState(): void  {
    if (this.childCheckboxes.length > 0) {
      for (const childCheckbox of this.childCheckboxes) {
        childCheckbox.state_ = this.state_;
      }
    }
  }
}
