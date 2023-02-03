import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisPage } from './diagnosis.page';

describe('DiagnosisPage', () => {
  let component: DiagnosisPage;
  let fixture: ComponentFixture<DiagnosisPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosisPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
