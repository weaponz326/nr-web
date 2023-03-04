import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectDispenseComponent } from './select-dispense/select-dispense.component';



@NgModule({
  declarations: [
    SelectDispenseComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectDispenseComponent
  ]
})
export class DispensaryWindowsModule { }
