import { TestBed } from '@angular/core/testing';

import { Hardware } from './hardware';

describe('Hardware', () => {
  let service: Hardware;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Hardware);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
