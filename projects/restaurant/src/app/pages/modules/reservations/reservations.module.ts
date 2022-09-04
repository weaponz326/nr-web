import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsPage } from './reservations.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllReservationsComponent } from './all-reservations/all-reservations.component';
import { NewReservationComponent } from './new-reservation/new-reservation.component';
import { ViewReservationComponent } from './view-reservation/view-reservation.component';
import { ReservationTablesComponent } from './reservation-tables/reservation-tables.component';


@NgModule({
  declarations: [
    ReservationsPage,
    DashboardComponent,
    AllReservationsComponent,
    NewReservationComponent,
    ViewReservationComponent,
    ReservationTablesComponent
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule
  ]
})
export class ReservationsModule { }
