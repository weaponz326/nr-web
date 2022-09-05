import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectReservationComponent } from './select-reservation/select-reservation.component';



@NgModule({
  declarations: [
    SelectReservationComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectReservationComponent
  ]
})
export class ReservationsWindowsModule { }
