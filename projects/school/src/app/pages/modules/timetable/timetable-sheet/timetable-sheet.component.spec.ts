import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableSheetComponent } from './timetable-sheet.component';

describe('TimetableSheetComponent', () => {
  let component: TimetableSheetComponent;
  let fixture: ComponentFixture<TimetableSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
