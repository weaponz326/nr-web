import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalSheetComponent } from './appraisal-sheet.component';

describe('AppraisalSheetComponent', () => {
  let component: AppraisalSheetComponent;
  let fixture: ComponentFixture<AppraisalSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppraisalSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppraisalSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
