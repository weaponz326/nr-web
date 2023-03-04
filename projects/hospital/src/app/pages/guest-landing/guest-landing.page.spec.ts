import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestLandingPage } from './guest-landing.page';

describe('GuestLandingPage', () => {
  let component: GuestLandingPage;
  let fixture: ComponentFixture<GuestLandingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestLandingPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestLandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
