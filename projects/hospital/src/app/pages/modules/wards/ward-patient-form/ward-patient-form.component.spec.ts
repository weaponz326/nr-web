import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardPatientFormComponent } from './ward-patient-form.component';

describe('WardPatientFormComponent', () => {
  let component: WardPatientFormComponent;
  let fixture: ComponentFixture<WardPatientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WardPatientFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WardPatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
