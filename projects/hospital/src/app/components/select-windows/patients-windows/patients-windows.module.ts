import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectPatientComponent } from './select-patient/select-patient.component';



@NgModule({
  declarations: [
    SelectPatientComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectPatientComponent
  ]
})
export class PatientsWindowsModule { }
