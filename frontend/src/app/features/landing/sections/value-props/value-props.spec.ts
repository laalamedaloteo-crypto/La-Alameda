import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueProps } from './value-props';

describe('ValueProps', () => {
  let component: ValueProps;
  let fixture: ComponentFixture<ValueProps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueProps]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValueProps);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
