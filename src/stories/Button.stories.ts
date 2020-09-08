// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
// import Button from './button.component';
import { ButtonComponent } from '../app/components/button/button.component';

export default {
  title: 'Example/Button',
  component: ButtonComponent,
  argTypes: {
    contentProjection: { control: 'text' },
    type: { control: {
      type: 'inline-radio',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger']
    }},
    size: { control: {
      type: 'inline-radio',
      options: ['default', 'inline', 'small']
    }},
    icon: { control: {
      type: 'inline-radio',
      options: ['', 'fas fa-sync-alt', 'fas fa-save', 'fas fa-plus-circle', 'fas fa-trash']
    } },
    disabled: { control: 'boolean' },
    clicked: { action: 'clicked' }
  },
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => {
  const returnFunction = ({
    component: ButtonComponent,
    moduleMetadata: {
      declarations: [ButtonComponent]
    },
    props: args,
    template: `
      <app-button
        [type]="type"
        [size]="size"
        [icon]="icon"
        [disabled]="disabled"
        (clicked)="clicked($event)"
      >
        {{contentProjection}}
      </app-button>`
  });
  return returnFunction;
}

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  size: 'default',
  disabled: false,
  contentProjection: 'Button',
};

/*export const Secondary = Template.bind({});
Secondary.args = {
  contentProjection: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  contentProjection: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  contentProjection: 'Button',
};
*/