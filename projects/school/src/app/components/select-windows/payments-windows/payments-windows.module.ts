import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { PaymentsWindowsComponent } from './payments-windows/payments-windows.component';



@NgModule({
  declarations: [
    PaymentsWindowsComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    PaymentsWindowsComponent
  ]
})
export class PaymentsWindowsModule { }
