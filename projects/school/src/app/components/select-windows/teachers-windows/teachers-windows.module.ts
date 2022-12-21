import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectTeacherComponent } from './select-teacher/select-teacher.component';



@NgModule({
  declarations: [
    SelectTeacherComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectTeacherComponent
  ]
})
export class TeachersWindowsModule { }
