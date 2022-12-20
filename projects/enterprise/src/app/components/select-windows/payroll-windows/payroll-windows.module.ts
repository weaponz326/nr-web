import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectPayrollComponent } from './select-payroll/select-payroll.component';



@NgModule({
  declarations: [
    SelectPayrollComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ]
})
export class PayrollWindowsModule { }
