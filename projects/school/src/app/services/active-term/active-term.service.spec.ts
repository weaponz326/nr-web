import { TestBed } from '@angular/core/testing';

import { ActiveTermService } from './active-term.service';

describe('ActiveTermService', () => {
  let service: ActiveTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveTermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
