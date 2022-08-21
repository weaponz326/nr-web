import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerViewComponent } from './scheduler-view.component';

describe('SchedulerViewComponent', () => {
  let component: SchedulerViewComponent;
  let fixture: ComponentFixture<SchedulerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulerViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
