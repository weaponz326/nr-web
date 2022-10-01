import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentPage } from './assessment.page';

describe('AssessmentPage', () => {
  let component: AssessmentPage;
  let fixture: ComponentFixture<AssessmentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
