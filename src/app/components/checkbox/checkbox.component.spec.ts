import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent, CheckboxState } from './checkbox.component';

class MockCheckbox implements Partial<CheckboxComponent> {
  registerChild() { }
  unregisterChild() { }
  unregisterSelfOnParent() { }
}

fdescribe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let dummyClickEvent: Event;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    dummyClickEvent = new Event('click');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be unchecked after initialization (without input)', () => {
    expect(component.state).toBe('unchecked');
  });

  it('should be checked after click', () => {
    component['toggle'](dummyClickEvent);
    expect(component.state).toBe('checked');
  });

  it('should be unchecked after click on checked state', () => {
    component.state = 'checked';
    component['toggle'](dummyClickEvent);
    expect(component.state).toBe('unchecked');
  });

  it('should be unchecked after click on intermediate state', () => {
    component.state = 'intermediate';
    component['toggle'](dummyClickEvent);
    expect(component.state).toBe('unchecked');
  });

  it('should not change state when disabled and clicked', () => {
    component.disabled = true;
    component['toggle'](dummyClickEvent);
    expect(component.state).toBe('unchecked');
  });

  it('should not not notify parent if disabled and clicked', () => {
    spyOn(component, 'notifyParentAboutChanges');
    component.disabled = true;
    component['toggle'](dummyClickEvent);
    expect(component.notifyParentAboutChanges).not.toHaveBeenCalled();
  });

  it('should not not set children if disabled and clicked', () => {
    spyOn(component, 'setChildrenState');
    component.disabled = true;
    component['toggle'](dummyClickEvent);
    expect(component.setChildrenState).not.toHaveBeenCalled();
  });

  it('should output new state if state was changed', () => {
    let newState: CheckboxState = null;
    component.stateChanged.subscribe((state: CheckboxState) => {
      newState = state;
    });
    component.state = 'checked';
    expect(newState).toBe('checked');
  });

  it('should not output new state if the new state is equal to the old state', () => {
    let newState: CheckboxState = null;
    component.stateChanged.subscribe((state: CheckboxState) => {
      newState = state;
    });
    component.state = 'unchecked';
    expect(newState).toBe(null);
  });

  it('should register on parent checkbox', () => {
    const parentCheckbox: MockCheckbox = new MockCheckbox();
    spyOn(parentCheckbox, 'registerChild');
    component.parent = (parentCheckbox as unknown as CheckboxComponent);
    fixture.detectChanges();
    component.ngOnInit();
    expect(parentCheckbox.registerChild).toHaveBeenCalled();
  });

  it('should unregister on parent checkbox on destroy', () => {
    const parentCheckbox: MockCheckbox = new MockCheckbox();
    spyOn(parentCheckbox, 'unregisterChild');
    component.parent = (parentCheckbox as unknown as CheckboxComponent);
    fixture.detectChanges();
    component.ngOnInit();
    component.ngOnDestroy();
    expect(parentCheckbox.unregisterChild).toHaveBeenCalled();
  });
});

