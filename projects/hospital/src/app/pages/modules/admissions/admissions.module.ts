import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionsRoutingModule } from './admissions-routing.module';
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
    AdmissionsRoutingModule
  ]
})
export class AdmissionsModule { }
