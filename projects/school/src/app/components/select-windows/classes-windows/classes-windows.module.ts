import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectClaseComponent } from './select-clase/select-clase.component';
import { SelectDepartmentComponent } from './select-department/select-department.component';



@NgModule({
  declarations: [
    SelectClaseComponent,
    SelectDepartmentComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectClaseComponent,
    SelectDepartmentComponent
  ]
})
export class ClassesWindowsModule { }
