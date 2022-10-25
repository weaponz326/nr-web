import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectClaseComponent } from './select-clase/select-clase.component';



@NgModule({
  declarations: [
    SelectClaseComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectClaseComponent
  ]
})
export class ClassesWindowsModule { }
