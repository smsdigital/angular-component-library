import { Component, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input('onPress')
  onPress: IOnPress;

  @Input('icon')
  icon: string;

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
    console.log('clicked!');
    if (this.onPress) {
      this.onPress.action.call(this.onPress.reference);
    }
    event.stopPropagation();
  }

}

interface IOnPress {
  action: () => any;
  reference: any;
}