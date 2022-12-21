import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLessonPlanComponent } from './select-lesson-plan.component';

describe('SelectLessonPlanComponent', () => {
  let component: SelectLessonPlanComponent;
  let fixture: ComponentFixture<SelectLessonPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectLessonPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectLessonPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
