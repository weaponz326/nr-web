import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectEmployeeComponent } from './select-employee/select-employee.component';



@NgModule({
  declarations: [
    SelectEmployeeComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectEmployeeComponent
  ]
})
export class EmployeesWindowsModule { }
