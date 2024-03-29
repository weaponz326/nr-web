import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDiagnosisComponent } from './new-diagnosis.component';

describe('NewDiagnosisComponent', () => {
  let component: NewDiagnosisComponent;
  let fixture: ComponentFixture<NewDiagnosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDiagnosisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
