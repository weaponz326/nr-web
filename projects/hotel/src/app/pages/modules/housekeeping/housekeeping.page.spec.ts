import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousekeepingPage } from './housekeeping.page';

describe('HousekeepingPage', () => {
  let component: HousekeepingPage;
  let fixture: ComponentFixture<HousekeepingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousekeepingPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousekeepingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
