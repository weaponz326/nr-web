import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLedgerComponent } from './all-ledger.component';

describe('AllLedgerComponent', () => {
  let component: AllLedgerComponent;
  let fixture: ComponentFixture<AllLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLedgerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
