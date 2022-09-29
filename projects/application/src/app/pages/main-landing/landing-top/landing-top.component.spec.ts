import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTopComponent } from './landing-top.component';

describe('LandingTopComponent', () => {
  let component: LandingTopComponent;
  let fixture: ComponentFixture<LandingTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
