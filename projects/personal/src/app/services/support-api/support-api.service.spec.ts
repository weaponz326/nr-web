import { TestBed } from '@angular/core/testing';

import { SupportApiService } from './support-api.service';

describe('SupportApiService', () => {
  let service: SupportApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
