import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdmissionsRoutingModule } from './admissions-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { PatientsWindowsModule } from '../../../components/select-windows/patients-windows/patients-windows.module';

import { AdmissionsPage } from './admissions.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllAdmissionsComponent } from './all-admissions/all-admissions.component';
import { NewAdmissionComponent } from './new-admission/new-admission.component';
import { ViewAdmissionComponent } from './view-admission/view-admission.component';
import { AdmissionFormComponent } from './admission-form/admission-form.component';
import { AdmissionActivitiesComponent } from './admission-activities/admission-activities.component';


@NgModule({
  declarations: [
    AdmissionsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllAdmissionsComponent,
    NewAdmissionComponent,
    ViewAdmissionComponent,
    AdmissionFormComponent,
    AdmissionActivitiesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdmissionsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    PatientsWindowsModule
  ]
})
export class AdmissionsModule { }
