import { Component, Input, HostBinding, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
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
  set disabled(value: boolean) {
    if(value) {
      this.elementRef.nativeElement.classList.add('disabled');
      this.elementRef.nativeElement.removeAttribute('tabindex');
    } else {
      this.elementRef.nativeElement.classList.remove('disabled');
      this.elementRef.nativeElement.setAttribute('tabindex', '0');
    }
  }

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

  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.disabled = false;
    this.type = 'primary';
    this.size = 'default';
    this.clicked = new EventEmitter<Event>();
  }

}

type buttonType = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
type buttonSize = 'default' | 'inline' | 'small';
