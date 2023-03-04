import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectStaffComponent } from './select-staff/select-staff.component';



@NgModule({
  declarations: [
    SelectStaffComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectStaffComponent
  ]
})
export class StaffWindowsModule { }
