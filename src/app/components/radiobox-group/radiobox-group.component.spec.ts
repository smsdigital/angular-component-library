import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioboxGroupComponent } from './radiobox-group.component';

describe('RadioboxGroupComponent', () => {
  let component: RadioboxGroupComponent;
  let fixture: ComponentFixture<RadioboxGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioboxGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioboxGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
