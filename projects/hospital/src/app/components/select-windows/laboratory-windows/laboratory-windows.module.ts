import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectLabComponent } from './select-lab/select-lab.component';



@NgModule({
  declarations: [
    SelectLabComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectLabComponent
  ]
})
export class LaboratoryWindowsModule { }
