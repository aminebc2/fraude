import { TestBed } from '@angular/core/testing';

import { FraudAlertService } from './fraud-alert.service';

describe('FraudAlertService', () => {
  let service: FraudAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FraudAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
