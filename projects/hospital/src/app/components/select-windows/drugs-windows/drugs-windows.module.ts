import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectDrugComponent } from './select-drug/select-drug.component';



@NgModule({
  declarations: [
    SelectDrugComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectDrugComponent
  ]
})
export class DrugsWindowsModule { }
