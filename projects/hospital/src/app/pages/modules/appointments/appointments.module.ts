import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsPage } from './appointments.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllAppointmentsComponent } from './all-appointments/all-appointments.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';


@NgModule({
  declarations: [
    AppointmentsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllAppointmentsComponent,
    AddAppointmentComponent,
    EditAppointmentComponent,
    AppointmentFormComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule
  ]
})
export class AppointmentsModule { }
