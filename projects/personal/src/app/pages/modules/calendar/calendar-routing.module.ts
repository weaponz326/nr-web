import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCalendarComponent } from './all-calendar/all-calendar.component';
import { AllSchedulesComponent } from './all-schedules/all-schedules.component';

import { CalendarPage } from './calendar.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewCalendarComponent } from './new-calendar/new-calendar.component';
import { ViewCalendarComponent } from './view-calendar/view-calendar.component';

const routes: Routes = [
  {
    path: "",
    component: CalendarPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "all-calendar", component: AllCalendarComponent },
      { path: "new-calendar", component: NewCalendarComponent },
      { path: "view-calendar", component: ViewCalendarComponent },
      { path: "all-schedules", component: AllSchedulesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
