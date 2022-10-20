import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersAttendanceComponent } from './teachers-attendance.component';

describe('TeachersAttendanceComponent', () => {
  let component: TeachersAttendanceComponent;
  let fixture: ComponentFixture<TeachersAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
