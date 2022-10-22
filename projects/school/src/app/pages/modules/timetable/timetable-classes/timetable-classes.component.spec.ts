import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableClassesComponent } from './timetable-classes.component';

describe('TimetableClassesComponent', () => {
  let component: TimetableClassesComponent;
  let fixture: ComponentFixture<TimetableClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableClassesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
