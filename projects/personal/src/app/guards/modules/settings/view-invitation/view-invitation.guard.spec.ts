import { TestBed } from '@angular/core/testing';

import { ViewInvitationGuard } from './view-invitation.guard';

describe('ViewInvitationGuard', () => {
  let guard: ViewInvitationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewInvitationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
