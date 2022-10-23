import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPlanDetailsComponent } from './lesson-plan-details.component';

describe('LessonPlanDetailsComponent', () => {
  let component: LessonPlanDetailsComponent;
  let fixture: ComponentFixture<LessonPlanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonPlanDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonPlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
