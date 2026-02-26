import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotsMap } from './lots-map';

describe('LotsMap', () => {
  let component: LotsMap;
  let fixture: ComponentFixture<LotsMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotsMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotsMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
