import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectSubjectComponent } from './select-subject/select-subject.component';



@NgModule({
  declarations: [
    SelectSubjectComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectSubjectComponent
  ]
})
export class SubjectsWindowsModule { }
