import { Component, Input, HostBinding, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'smsdigital-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {

  private disabled_: boolean;

  @Input('size')
  size: buttonSize;

  @Input('icon')
  icon: string;

  @Input('type')
  type: buttonType;

  @HostBinding('class')
  private get classes(): string {
    const type: string = `type-${this.type}`;
    const size: string = `size-${this.size}`;
    const disabled: string = this.disabled_ ? 'disabled' : '';
    return `${type} ${size} ${disabled}`;
  }

  @Input('disabled')
  set disabled(value: boolean) {
    this.disabled_ = value;
    if (this.disabled_) {
      this.elementRef.nativeElement.removeAttribute('tabindex');
    } else {
      this.elementRef.nativeElement.setAttribute('tabindex', '0');
    }
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  @HostListener('click', ['$event'])
  private execute(event: Event) {
    if (!this.disabled_) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.clicked.next(event);
    }
  }

  @Output('clicked')
  clicked: EventEmitter<Event>;

  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.disabled = false;
    this.type = 'primary';
    this.size = 'default';
    this.clicked = new EventEmitter<Event>();
  }

}

type buttonType = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
type buttonSize = 'default' | 'inline' | 'small';
