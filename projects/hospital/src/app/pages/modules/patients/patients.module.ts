import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientsRoutingModule } from './patients-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

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
    FormsModule,
    ReactiveFormsModule,
    PatientsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class PatientsModule { }
