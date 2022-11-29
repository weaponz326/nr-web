import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectDuesComponent } from './select-dues/select-dues.component';
import { SelectPaymentComponent } from './select-payment/select-payment.component';



@NgModule({
  declarations: [
    SelectDuesComponent,
    SelectPaymentComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectDuesComponent,
    SelectPaymentComponent
  ]
})
export class DuesWindowsModule { }
