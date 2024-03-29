import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSheetsComponent } from './all-sheets.component';

describe('AllSheetsComponent', () => {
  let component: AllSheetsComponent;
  let fixture: ComponentFixture<AllSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSheetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
