import { TestBed } from '@angular/core/testing';

import { LessonPlanApiService } from './lesson-plan-api.service';

describe('LessonPlanApiService', () => {
  let service: LessonPlanApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonPlanApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
