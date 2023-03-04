import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectAdmissionComponent } from './select-admission/select-admission.component';



@NgModule({
  declarations: [
    SelectAdmissionComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectAdmissionComponent
  ]
})
export class AdmissionsWindowsModule { }
