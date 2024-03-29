import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisDetailsComponent } from './diagnosis-details.component';

describe('DiagnosisDetailsComponent', () => {
  let component: DiagnosisDetailsComponent;
  let fixture: ComponentFixture<DiagnosisDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosisDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
