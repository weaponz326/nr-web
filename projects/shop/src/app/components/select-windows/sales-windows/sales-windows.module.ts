import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectSalesComponent } from './select-sales/select-sales.component';



@NgModule({
  declarations: [
    SelectSalesComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectSalesComponent
  ]
})
export class SalesWindowsModule { }
