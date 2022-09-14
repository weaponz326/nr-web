import { TestBed } from '@angular/core/testing';

import { ViewMenuItemGuard } from './view-menu-item.guard';

describe('ViewMenuItemGuard', () => {
  let guard: ViewMenuItemGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewMenuItemGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
