import { TestBed } from '@angular/core/testing';

import { ViewReservationGuard } from './view-reservation.guard';

describe('ViewReservationGuard', () => {
  let guard: ViewReservationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewReservationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
