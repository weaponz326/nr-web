import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsPage } from './patients.page';
import { AllPatientsComponent } from './all-patients/all-patients.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';


@NgModule({
  declarations: [
    PatientsPage,
    AllPatientsComponent,
    NewPatientComponent,
    ViewPatientComponent,
    PatientFormComponent,
    DashboardComponent,
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
