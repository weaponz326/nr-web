import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavePage } from './leave.page';

describe('LeavePage', () => {
  let component: LeavePage;
  let fixture: ComponentFixture<LeavePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavePage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
