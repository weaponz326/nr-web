import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSheetComponent } from './plan-sheet.component';

describe('PlanSheetComponent', () => {
  let component: PlanSheetComponent;
  let fixture: ComponentFixture<PlanSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
