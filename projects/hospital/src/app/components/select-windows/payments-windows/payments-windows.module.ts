import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectPaymentComponent } from './select-payment/select-payment.component';



@NgModule({
  declarations: [
    SelectPaymentComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectPaymentComponent
  ]
})
export class PaymentsWindowsModule { }
