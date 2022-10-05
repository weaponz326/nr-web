import { TestBed } from '@angular/core/testing';

import { ConfigAccessGuard } from './config-access.guard';

describe('ConfigAccessGuard', () => {
  let guard: ConfigAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfigAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
