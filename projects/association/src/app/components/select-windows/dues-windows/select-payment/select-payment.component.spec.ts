import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPaymentComponent } from './select-payment.component';

describe('SelectPaymentComponent', () => {
  let component: SelectPaymentComponent;
  let fixture: ComponentFixture<SelectPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
