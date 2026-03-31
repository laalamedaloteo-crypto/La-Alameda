import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Destacadas } from './destacadas';

describe('Destacadas', () => {
  let component: Destacadas;
  let fixture: ComponentFixture<Destacadas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Destacadas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Destacadas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
