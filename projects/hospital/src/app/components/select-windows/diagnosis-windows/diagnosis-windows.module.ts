import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectDiagnosisComponent } from './select-diagnosis/select-diagnosis.component';



@NgModule({
  declarations: [
    SelectDiagnosisComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectDiagnosisComponent
  ]
})
export class DiagnosisWindowsModule { }
