import { TestBed } from '@angular/core/testing';

import { ViewMenuGroupGuard } from './view-menu-group.guard';

describe('ViewMenuGroupGuard', () => {
  let guard: ViewMenuGroupGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewMenuGroupGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
