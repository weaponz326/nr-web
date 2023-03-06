import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { PatientsWindowsModule } from '../../../components/select-windows/patients-windows/patients-windows.module';

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
    FormsModule,
    ReactiveFormsModule,
    AppointmentsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    PatientsWindowsModule
  ]
})
export class AppointmentsModule { }
