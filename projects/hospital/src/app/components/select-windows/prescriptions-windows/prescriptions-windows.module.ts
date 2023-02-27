import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectPrescriptionComponent } from './select-prescription/select-prescription.component';



@NgModule({
  declarations: [
    SelectPrescriptionComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectPrescriptionComponent
  ]
})
export class PrescriptionsWindowsModule { }
