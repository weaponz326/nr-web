import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectAppointmentComponent } from './select-appointment/select-appointment.component';



@NgModule({
  declarations: [
    SelectAppointmentComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectAppointmentComponent
  ]
})
export class AppointmentsWindowsModule { }
