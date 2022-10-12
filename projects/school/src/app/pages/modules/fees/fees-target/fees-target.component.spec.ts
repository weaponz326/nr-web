import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesTargetComponent } from './fees-target.component';

describe('FeesTargetComponent', () => {
  let component: FeesTargetComponent;
  let fixture: ComponentFixture<FeesTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesTargetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeesTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
