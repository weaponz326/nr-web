import { TestBed } from '@angular/core/testing';

import { ViewBillGuard } from './view-bill.guard';

describe('ViewBillGuard', () => {
  let guard: ViewBillGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewBillGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
