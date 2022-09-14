import { TestBed } from '@angular/core/testing';

import { ViewCustomerGuard } from './view-customer.guard';

describe('ViewCustomerGuard', () => {
  let guard: ViewCustomerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewCustomerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
