import { TestBed } from '@angular/core/testing';

import { ViewTaskGuard } from './view-task.guard';

describe('ViewTaskGuard', () => {
  let guard: ViewTaskGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewTaskGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
