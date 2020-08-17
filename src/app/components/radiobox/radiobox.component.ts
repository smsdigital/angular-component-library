import { Component, OnInit, HostBinding, HostListener, Output, EventEmitter, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-radiobox',
  templateUrl: './radiobox.component.html',
  styleUrls: ['./radiobox.component.scss']
})
export class RadioboxComponent implements OnInit, OnDestroy {

  static groups = new Map<string, RadioboxComponent[]>();

  private isInitialized: boolean;
  private checked_: boolean;
  private group: RadioboxComponent[];

  @Output('stateChanged')
  stateChanged: EventEmitter<boolean>;

  @HostListener('click')
  clicked(): void {
    this.checked = true;
    this.uncheckOtherRadioboxes();
  }

  @Input('checkedOnStart')
  checkedOnStart: boolean;

  @Input('group')
  groupName: string;

  set checked(value: boolean) {
    this.checked_ = value;
    if (this.isInitialized) {
      this.stateChanged.next(value);
    }
  }
  
  @HostBinding('class.checked')
  get checked(): boolean {
    return this.checked_;
  }

  constructor() {
    this.isInitialized = false;
    this.checked = false;
    this.stateChanged = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.isInitialized = true;
    this.getGroup();
    this.registerOnGroup();
    this.checkStartValue();
  }

  ngOnDestroy() {
    this.unregisterOnGroup();
  }

  private getGroup(): void {
    if (!RadioboxComponent.groups.has(this.groupName)) {
      RadioboxComponent.groups.set(this.groupName, []);
    }
    this.group = RadioboxComponent.groups.get(this.groupName);
  }

  private checkStartValue(): void {
    if (this.checkedOnStart) {
      this.checked = true;
    }
    this.checkForDuplicatesError();
  }

  private checkForDuplicatesError(): void {
    let checkedCount: number = 0;
    for (const radiobox of this.group) {
      if(radiobox.checked) {
        checkedCount++;
      }
    }
    if (checkedCount > 1) {
      console.error('There were more than 2 radioboxes checked on start!');
    }
  }

  private uncheckOtherRadioboxes(): void {
    for (const radiobox of this.group) {
      if (radiobox !== this) {
        radiobox.checked = false;
      }
    }
  }

  private registerOnGroup(): void {
    this.group.push(this);
  }

  private unregisterOnGroup(): void {
    const index: number = this.group.indexOf(this);
    this.group.splice(index, 1);
    if (this.group.length === 0) {
      RadioboxComponent.groups.delete(this.groupName);
    }
  }

}
