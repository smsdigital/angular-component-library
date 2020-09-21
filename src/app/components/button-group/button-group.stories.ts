import { Story, Meta } from '@storybook/angular/types-6-0';

import { ButtonGroupComponent } from './button-group.component';
import { ButtonComponent } from '../button/button.component';

export default {
  title: 'Example/Button Group',
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
    <app-button-group>
      <app-button [type]="'primary'" [size]="'default'">Primary Button</app-button>
      <app-button [type]="'secondary'" [size]="'default'">Secondary Button</app-button>
      <app-button [type]="'secondary'" [size]="'default'">Secondary Button</app-button>
    </app-button-group>`
});

export const Component = template.bind({});
