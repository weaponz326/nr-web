import { TestBed } from '@angular/core/testing';

import { DiagmosisApiService } from './diagmosis-api.service';

describe('DiagmosisApiService', () => {
  let service: DiagmosisApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagmosisApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
