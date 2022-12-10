import { TestBed } from '@angular/core/testing';

import { ViewUserGuard } from './view-user.guard';

describe('ViewUserGuard', () => {
  let guard: ViewUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
