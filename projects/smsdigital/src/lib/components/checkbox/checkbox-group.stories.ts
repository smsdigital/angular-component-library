import { Story, Meta } from '@storybook/angular/types-6-0';

import { hideProperties } from '../../../../../../.storybook/helper';
import { CheckboxComponent } from './checkbox.component';

export default {
    title: 'SMS-Digital/Components/Checkbox/Group',
    component: CheckboxComponent,
    parameters: {
        controls: {
          disabled: true,
        },
        actions: {
          disabled: true,
        }
      }
} as Meta;

const template: Story<CheckboxComponent> = (params: CheckboxComponent) => ({
    component: CheckboxComponent,
    moduleMetadata: {
        declarations: [CheckboxComponent]
    },
    props: params,
    template: `
      <smsdigital-checkbox #parent>Parent</smsdigital-checkbox><br>
        ___ <smsdigital-checkbox [parent]="parent">Child 1</smsdigital-checkbox><br>
        ___ <smsdigital-checkbox [parent]="parent">Child 2</smsdigital-checkbox><br>
        ___ <smsdigital-checkbox [parent]="parent" #child3>Child 3</smsdigital-checkbox><br>
        ______ <smsdigital-checkbox [parent]="child3" #grandchild1>GrandChild 1</smsdigital-checkbox><br>
        ______ <smsdigital-checkbox [parent]="child3" #grandchild2>GrandChild 2</smsdigital-checkbox><br>
        ______ <smsdigital-checkbox [parent]="child3" #grandchild3>GrandChild 3</smsdigital-checkbox><br>
      `
});

export const Component = template.bind({});

hideProperties(
  Component,
  'childCheckboxes',
  'isInitialized',
  'childHasChanged',
  'ngOnDestroy',
  'ngOnInit',
  'notifyParentAboutChanges',
  'registerChild',
  'registerSelfOnParent',
  'setChildrenState',
  'setOwnState',
  'unregisterChild',
  'unregisterSelfOnParent'
);
