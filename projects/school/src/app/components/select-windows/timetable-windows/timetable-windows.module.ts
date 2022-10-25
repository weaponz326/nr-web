import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectTimetableComponent } from './select-timetable/select-timetable.component';



@NgModule({
  declarations: [
    SelectTimetableComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectTimetableComponent
  ]
})
export class TimetableWindowsModule { }
