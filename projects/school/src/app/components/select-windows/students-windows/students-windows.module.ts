import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectStudentComponent } from './select-student/select-student.component';



@NgModule({
  declarations: [
    SelectStudentComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectStudentComponent
  ]
})
export class StudentsWindowsModule { }
