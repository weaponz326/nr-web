import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentClassesComponent } from './assessment-classes.component';

describe('AssessmentClassesComponent', () => {
  let component: AssessmentClassesComponent;
  let fixture: ComponentFixture<AssessmentClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentClassesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
