import { Story, Meta } from '@storybook/angular/types-6-0';

import { ButtonGroupComponent } from './button-group.component';
import { ButtonComponent } from '../button/button.component';

export default {
  title: 'SMS-Digital/Components/Button Group',
  component: ButtonGroupComponent,
  parameters: {
    controls: {
      disabled: true,
    },
    actions: {
      disabled: true,
    }
  }
} as Meta;

const template: Story<ButtonGroupComponent> = (params: ButtonGroupComponent) => ({
  component: ButtonGroupComponent,
  moduleMetadata: {
    declarations: [ButtonGroupComponent, ButtonComponent]
  },
  props: params,
  template: `
    <smsdigital-button-group>
      <smsdigital-button [type]="'primary'" [size]="'default'">Primary Button</smsdigital-button>
      <smsdigital-button [type]="'secondary'" [size]="'default'">Secondary Button</smsdigital-button>
      <smsdigital-button [type]="'secondary'" [size]="'default'">Secondary Button</smsdigital-button>
    </smsdigital-button-group>`
});

export const Component = template.bind({});
