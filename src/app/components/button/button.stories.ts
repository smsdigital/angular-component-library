import { Story, Meta } from '@storybook/angular/types-6-0';
import { ButtonComponent } from './button.component';

export default {
  title: 'Example/Button',
  component: ButtonComponent,
  argTypes: {
    contentProjection: { control: 'text' },
    type: {
      control: {
        type: 'inline-radio',
        options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger']
      }
    },
    size: {
      control: {
        type: 'inline-radio',
        options: ['default', 'inline', 'small']
      }
    },
    icon: {
      control: {
        type: 'inline-radio',
        options: ['', 'fas fa-sync-alt', 'fas fa-save', 'fas fa-plus-circle', 'fas fa-trash']
      }
    },
    disabled: { control: 'boolean' },
    clicked: { action: 'clicked' }
  },
} as Meta;

const template: Story<ButtonComponent> = (params: ButtonComponent) => ({
  component: ButtonComponent,
  moduleMetadata: {
    declarations: [ButtonComponent]
  },
  props: params,
  template: `
    <app-button
      [type]="type"
      [size]="size"
      [icon]="icon"
      [disabled]="disabled"
      (clicked)="clicked($event)"
    >{{contentProjection}}</app-button>`
});

export const Component = template.bind({});
Component.args = {
  type: 'primary',
  size: 'default',
  disabled: false,
  contentProjection: 'Button',
};
Component.argTypes = {
  disabled_: { table: { disable: true } },
};
