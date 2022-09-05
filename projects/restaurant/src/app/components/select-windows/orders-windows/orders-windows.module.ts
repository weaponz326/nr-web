import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectOrderComponent } from './select-order/select-order.component';



@NgModule({
  declarations: [
    SelectOrderComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectOrderComponent
  ]
})
export class OrdersWindowsModule { }
