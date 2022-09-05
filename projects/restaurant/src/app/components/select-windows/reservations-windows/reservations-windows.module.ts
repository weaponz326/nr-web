import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectReservationComponent } from './select-reservation/select-reservation.component';



@NgModule({
  declarations: [
    SelectReservationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectReservationComponent
  ]
})
export class ReservationsWindowsModule { }
