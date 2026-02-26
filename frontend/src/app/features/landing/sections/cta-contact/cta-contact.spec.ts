import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaContact } from './cta-contact';

describe('CtaContact', () => {
  let component: CtaContact;
  let fixture: ComponentFixture<CtaContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtaContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
