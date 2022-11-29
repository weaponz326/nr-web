import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFiscalYearComponent } from './select-fiscal-year.component';

describe('SelectFiscalYearComponent', () => {
  let component: SelectFiscalYearComponent;
  let fixture: ComponentFixture<SelectFiscalYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFiscalYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFiscalYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
