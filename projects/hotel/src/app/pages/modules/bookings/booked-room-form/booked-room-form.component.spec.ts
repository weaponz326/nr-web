import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedRoomFormComponent } from './booked-room-form.component';

describe('BookedRoomFormComponent', () => {
  let component: BookedRoomFormComponent;
  let fixture: ComponentFixture<BookedRoomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedRoomFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedRoomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
