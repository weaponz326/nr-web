import { TestBed } from '@angular/core/testing';

import { SortingSwitchService } from './sorting-switch.service';

describe('SortingSwitchService', () => {
  let service: SortingSwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingSwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
