import { TestBed } from '@angular/core/testing';

import { ViewOrderGuard } from './view-order.guard';

describe('ViewOrderGuard', () => {
  let guard: ViewOrderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewOrderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
