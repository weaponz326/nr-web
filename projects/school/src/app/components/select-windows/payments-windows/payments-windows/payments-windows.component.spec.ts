import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsWindowsComponent } from './payments-windows.component';

describe('PaymentsWindowsComponent', () => {
  let component: PaymentsWindowsComponent;
  let fixture: ComponentFixture<PaymentsWindowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsWindowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
