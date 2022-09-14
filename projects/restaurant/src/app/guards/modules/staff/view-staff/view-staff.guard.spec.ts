import { TestBed } from '@angular/core/testing';

import { ViewStaffGuard } from './view-staff.guard';

describe('ViewStaffGuard', () => {
  let guard: ViewStaffGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewStaffGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
