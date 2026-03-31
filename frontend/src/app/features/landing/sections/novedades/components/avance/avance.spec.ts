import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Avance } from './avance';

describe('Avance', () => {
  let component: Avance;
  let fixture: ComponentFixture<Avance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Avance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Avance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
