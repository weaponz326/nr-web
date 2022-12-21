import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalPage } from './appraisal.page';

describe('AppraisalPage', () => {
  let component: AppraisalPage;
  let fixture: ComponentFixture<AppraisalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppraisalPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppraisalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
