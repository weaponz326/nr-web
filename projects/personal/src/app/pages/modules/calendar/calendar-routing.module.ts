import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCalendarComponent } from './all-calendar/all-calendar.component';
import { AllSchedulesComponent } from './all-schedules/all-schedules.component';

import { CalendarPage } from './calendar.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewCalendarComponent } from './view-calendar/view-calendar.component';
import { ConfigurationComponent } from './configuration/configuration.component';

import { ViewCalendarGuard } from '../../../guards/modules/calendar/view-calendar/view-calendar.guard';


const routes: Routes = [
  {
    path: "",
    component: CalendarPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-calendar", component: AllCalendarComponent },
      { path: "view-calendar", component: ViewCalendarComponent, canActivate: [ViewCalendarGuard] },
      { path: "all-schedules", component: AllSchedulesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
