import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensePrescriptionComponent } from './dispense-prescription.component';

describe('DispensePrescriptionComponent', () => {
  let component: DispensePrescriptionComponent;
  let fixture: ComponentFixture<DispensePrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispensePrescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispensePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
