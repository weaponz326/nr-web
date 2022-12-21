import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsPage } from './meetings.page';

describe('MeetingsPage', () => {
  let component: MeetingsPage;
  let fixture: ComponentFixture<MeetingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingsPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
