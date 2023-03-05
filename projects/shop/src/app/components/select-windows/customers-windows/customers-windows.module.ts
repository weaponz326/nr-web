import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectCustomerComponent } from './select-customer/select-customer.component';



@NgModule({
  declarations: [
    SelectCustomerComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectCustomerComponent
  ]
})
export class CustomersWindowsModule { }
