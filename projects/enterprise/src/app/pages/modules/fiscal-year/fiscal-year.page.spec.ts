import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalYearPage } from './fiscal-year.page';

describe('FiscalYearPage', () => {
  let component: FiscalYearPage;
  let fixture: ComponentFixture<FiscalYearPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiscalYearPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiscalYearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
