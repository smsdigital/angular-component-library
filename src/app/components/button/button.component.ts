import { Component, Input, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {
    "[attr.tabindex]": "0",
  }
})
export class ButtonComponent {

  @Input('size')
  size: buttonSize;

  @Input('icon')
  icon: string;

  @Input('type')
  type: buttonType;

  @HostBinding('class')
  private get classes(): string[] {
    const type = `type-${this.type}`;
    const size = `size-${this.size}`;
    return [type, size];
  }

  @Input('disabled')
  @HostBinding('class.disabled')
  disabled: boolean;

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  @HostListener('click', ['$event'])
  private execute(event: Event) {
    if(!this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.clicked.next(event);
    }
  }

  @Output('clicked')
  clicked: EventEmitter<Event>;

  constructor() {
    this.disabled = false;
    this.type = 'primary';
    this.size = 'default';
    this.clicked = new EventEmitter<Event>();
  }

}

type buttonType = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
type buttonSize = 'default' | 'inline' | 'small';
