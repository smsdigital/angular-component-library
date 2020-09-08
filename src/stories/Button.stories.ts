// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import Button from './button.component';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'clicked' },
    contentProjection: { control: 'text'}
  },
} as Meta;

const Template: Story<Button> = (args: Button) => {
  const returnFunction = ({
    component: Button,
    moduleMetadata: {
      declarations: [Button]
    },
    props: args,
    template: `
      <storybook-button
        [backgroundColor]="backgroundColor"
        [primary]="primary"
        [size]="size"
        (click)="onClick($event)"
      >
        {{contentProjection}}
      </storybook-button>`
  });
  return returnFunction;
}

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  contentProjection: 'Button',
};

export const Secondary = Template.bind({});
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
