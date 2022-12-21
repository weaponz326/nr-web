import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectAttendanceComponent } from './select-attendance/select-attendance.component';



@NgModule({
  declarations: [
    SelectAttendanceComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectAttendanceComponent
  ]
})
export class AttendanceWindowsModule { }
