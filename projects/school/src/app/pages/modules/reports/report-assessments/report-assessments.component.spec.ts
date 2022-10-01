import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAssessmentsComponent } from './report-assessments.component';

describe('ReportAssessmentsComponent', () => {
  let component: ReportAssessmentsComponent;
  let fixture: ComponentFixture<ReportAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAssessmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
