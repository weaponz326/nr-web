import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationsPage } from './reservations.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllReservationsComponent } from './all-reservations/all-reservations.component';
import { ViewReservationComponent } from './view-reservation/view-reservation.component';

import { ViewReservationGuard } from '../../../guards/modules/reservations/view-reservation/view-reservation.guard';

const routes: Routes = [
  {
    path: "",
    component: ReservationsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "all-reservations", component: AllReservationsComponent },
      { path: "view-reservation", component: ViewReservationComponent, canActivate: [ViewReservationGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
