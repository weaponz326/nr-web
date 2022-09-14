import { TestBed } from '@angular/core/testing';

import { ViewDeliveryGuard } from './view-delivery.guard';

describe('ViewDeliveryGuard', () => {
  let guard: ViewDeliveryGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewDeliveryGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
