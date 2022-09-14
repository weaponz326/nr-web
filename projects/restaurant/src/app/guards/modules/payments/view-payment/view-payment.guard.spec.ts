import { TestBed } from '@angular/core/testing';

import { ViewPaymentGuard } from './view-payment.guard';

describe('ViewPaymentGuard', () => {
  let guard: ViewPaymentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewPaymentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
