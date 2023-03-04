import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookingsPage } from './bookings.page';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: "",
    component: BookingsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-bookings", component: AllBookingsComponent },
      { path: "view-booking", component: ViewBookingComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
