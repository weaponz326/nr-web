import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWardPatientComponent } from './edit-ward-patient.component';

describe('EditWardPatientComponent', () => {
  let component: EditWardPatientComponent;
  let fixture: ComponentFixture<EditWardPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWardPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWardPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
