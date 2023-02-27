import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectNurseComponent } from './select-nurse/select-nurse.component';



@NgModule({
  declarations: [
    SelectNurseComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectNurseComponent
  ]
})
export class NursesWindowsModule { }
