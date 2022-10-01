import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPlanPage } from './lesson-plan.page';

describe('LessonPlanPage', () => {
  let component: LessonPlanPage;
  let fixture: ComponentFixture<LessonPlanPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonPlanPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
