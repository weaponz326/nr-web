import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectBillComponent } from './select-bill/select-bill.component';



@NgModule({
  declarations: [
    SelectBillComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectBillComponent
  ]
})
export class BillsWindowsModule { }
