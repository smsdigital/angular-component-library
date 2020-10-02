import { Story, Meta } from '@storybook/angular/types-6-0';
import { hideProperties } from '../../../../.storybook/helper';
import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';
import { RadiobuttonGroupComponent } from './radiobutton-group.component';

export default {
  title: 'Example/Radio-Button-Group',
  component: RadiobuttonGroupComponent,
  argTypes: {
    label: {
      control: {
        type: 'text'
      }
    },
    preSelectedOptionValue: {
      control: {
        type: 'text'
      }
    },
    stackedList: {
      control: {
        type: 'boolean'
      }
    },
    disabled: {
      control: {
        type: 'boolean'
      }
    },
    optionSelected: { action: 'optionSelected' }
  },
} as Meta;

const template: Story<RadiobuttonGroupComponent> = (params: RadiobuttonGroupComponent) => ({
  component: RadiobuttonGroupComponent,
  moduleMetadata: {
    declarations: [RadiobuttonGroupComponent, RadiobuttonComponent]
  },
  props: params,
  template: `
  <app-radiobutton-group
    [label]="label"
    [preSelectedOptionValue]="preSelectedOptionValue"
    [stackedList]="stackedList"
    [disabled]="disabled"
    (optionSelected)="optionSelected($event)"
    #selectGender
  >
    <app-radiobutton [value]="'none'" [disabled]="true">No Gender</app-radiobutton>
    <app-radiobutton [value]="'m'" [disabled]="selectGender.disabled">Male</app-radiobutton>
    <app-radiobutton [value]="'f'" [disabled]="selectGender.disabled">Female</app-radiobutton>
    <app-radiobutton [value]="'d'" [disabled]="selectGender.disabled">Diverse / Other</app-radiobutton>
  </app-radiobutton-group>`
});

export const Component = template.bind({});
Component.args = {
  label: 'Please select your gender:',
  preSelectedOptionValue: 'f',
  stackedList: true,
  disabled: false
};

hideProperties(
  Component,
  'destroySubject$',
  'selectedOption_',
  'checkForPreSelection',
  'listenToChildren',
  'newRadioButtonSelected',
  'ngAfterContentInit',
  'ngOnDestroy',
  'ngOnInit',
  'radiobuttons'
);
