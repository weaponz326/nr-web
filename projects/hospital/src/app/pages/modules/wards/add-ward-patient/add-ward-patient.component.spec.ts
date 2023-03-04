import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWardPatientComponent } from './add-ward-patient.component';

describe('AddWardPatientComponent', () => {
  let component: AddWardPatientComponent;
  let fixture: ComponentFixture<AddWardPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWardPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWardPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
