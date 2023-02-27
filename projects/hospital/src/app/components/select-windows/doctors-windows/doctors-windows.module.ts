import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectDoctorComponent } from './select-doctor/select-doctor.component';



@NgModule({
  declarations: [
    SelectDoctorComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectDoctorComponent
  ]
})
export class DoctorsWindowsModule { }
