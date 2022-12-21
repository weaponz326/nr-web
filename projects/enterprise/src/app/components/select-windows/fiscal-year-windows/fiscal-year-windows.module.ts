import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectFiscalYearComponent } from './select-fiscal-year/select-fiscal-year.component';



@NgModule({
  declarations: [
    SelectFiscalYearComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectFiscalYearComponent
  ]
})
export class FiscalYearWindowsModule { }
