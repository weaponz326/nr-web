import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionsPage } from './admissions.page';

describe('AdmissionsPage', () => {
  let component: AdmissionsPage;
  let fixture: ComponentFixture<AdmissionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionsPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
