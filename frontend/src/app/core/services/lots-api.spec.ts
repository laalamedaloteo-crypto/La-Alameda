import { TestBed } from '@angular/core/testing';

import { LotsApi } from './lots-api';

describe('LotsApi', () => {
  let service: LotsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
