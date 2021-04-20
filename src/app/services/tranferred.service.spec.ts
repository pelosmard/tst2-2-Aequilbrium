import { TestBed } from '@angular/core/testing';

import { TranferredService } from './tranferred.service';

describe('TranferredService', () => {
  let service: TranferredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranferredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
