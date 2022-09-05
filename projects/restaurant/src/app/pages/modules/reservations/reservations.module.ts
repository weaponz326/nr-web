import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { MainNavbarModule } from 'projects/personal/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

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
    FormsModule,
    ReactiveFormsModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    ReservationsRoutingModule
  ]
})
export class ReservationsModule { }
