import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPaymentComponent } from './select-payment/select-payment.component';



@NgModule({
  declarations: [
    SelectPaymentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectPaymentComponent    
  ]
})
export class PaymentsWindowsModule { }
