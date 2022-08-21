import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllAppointmentsComponent } from './all-appointments/all-appointments.component';
import { ViewCalendarComponent } from './view-calendar/view-calendar.component';
import { NewCalendarComponent } from './new-calendar/new-calendar.component';
import { AllCalendarComponent } from './all-calendar/all-calendar.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';


@NgModule({
  declarations: [
    CalendarPage,
    DashboardComponent,
    AllAppointmentsComponent,
    ViewCalendarComponent,
    NewCalendarComponent,
    AllCalendarComponent,
    AddAppointmentComponent,
    EditAppointmentComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }
