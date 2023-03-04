import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinRoomsComponent } from './checkin-rooms.component';

describe('CheckinRoomsComponent', () => {
  let component: CheckinRoomsComponent;
  let fixture: ComponentFixture<CheckinRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinRoomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckinRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
