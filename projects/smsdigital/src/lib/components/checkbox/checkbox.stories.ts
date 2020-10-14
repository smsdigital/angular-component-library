import { Story, Meta } from '@storybook/angular/types-6-0';

import { hideProperties } from '../../../../../../.storybook/helper';
import { CheckboxComponent } from './checkbox.component';

export default {
    title: 'SMS-Digital/Components/Checkbox/Single',
    component: CheckboxComponent,
    argTypes: {
        contentProjection: { control: 'text' },
        disabled: {
            control: {
                type: 'boolean'
            }
        },
        state: {
            control: {
                type: 'inline-radio',
                options: ['checked', 'intermediate', 'unchecked']
            }
        },
        stateChanged: { action: 'stateChanged' }
    }
} as Meta;

const template: Story<CheckboxComponent> = (params: CheckboxComponent) => ({
    component: CheckboxComponent,
    moduleMetadata: {
        declarations: [CheckboxComponent]
    },
    props: params,
    template: `
    <smsdigital-checkbox
        [disabled]="disabled"
        [state]="state"
        (stateChanged)="stateChanged($event)"
    >{{contentProjection}}</smsdigital-checkbox>`
});

export const Component = template.bind({});
Component.args = {
    disabled: false,
    state: 'unchecked',
    contentProjection: 'Checkbox',
};

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
