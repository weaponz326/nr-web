import { TestBed } from '@angular/core/testing';

import { ViewRosterGuard } from './view-roster.guard';

describe('ViewRosterGuard', () => {
  let guard: ViewRosterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewRosterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
