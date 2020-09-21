import { Story, Meta } from '@storybook/angular/types-6-0';
import { CheckboxComponent } from './checkbox.component';

export default {
    title: 'Example/Checkbox/Group',
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
      <app-checkbox #parent>Parent</app-checkbox><br>
        ___ <app-checkbox [parent]="parent" #child1>Child 1</app-checkbox><br>
        ___ <app-checkbox [parent]="parent"#child2>Child 2</app-checkbox><br>
        ___ <app-checkbox [parent]="parent" #child3>Child 3</app-checkbox><br>
        ______ <app-checkbox [parent]="child3" #grandchild1>GrandChild 1</app-checkbox><br>
        ______ <app-checkbox [parent]="child3" #grandchild2>GrandChild 2</app-checkbox><br>
        ______ <app-checkbox [parent]="child3" #grandchild3>GrandChild 3</app-checkbox><br>
      `
});

export const Component = template.bind({});
