import { TestBed } from '@angular/core/testing';

import { SignalsDataService } from './signals-data.service';

describe('SignalsDataService', () => {
  let service: SignalsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
