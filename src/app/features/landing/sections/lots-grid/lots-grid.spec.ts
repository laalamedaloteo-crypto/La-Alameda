import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotsGrid } from './lots-grid';

describe('LotsGrid', () => {
  let component: LotsGrid;
  let fixture: ComponentFixture<LotsGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotsGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotsGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
