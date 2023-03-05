import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectInvoiceComponent } from './select-invoice/select-invoice.component';



@NgModule({
  declarations: [
    SelectInvoiceComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectInvoiceComponent
  ]
})
export class InvoiceWindowsModule { }
