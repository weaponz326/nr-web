import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCheckinComponent } from './view-checkin.component';

describe('ViewCheckinComponent', () => {
  let component: ViewCheckinComponent;
  let fixture: ComponentFixture<ViewCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCheckinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
