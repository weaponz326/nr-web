import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WardsRoutingModule } from './wards-routing.module';
import { WardsPage } from './wards.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllWardsComponent } from './all-wards/all-wards.component';
import { NewWardComponent } from './new-ward/new-ward.component';
import { ViewWardComponent } from './view-ward/view-ward.component';
import { WardFormComponent } from './ward-form/ward-form.component';
import { WardPatientsComponent } from './ward-patients/ward-patients.component';
import { AddWardPatientComponent } from './add-ward-patient/add-ward-patient.component';
import { EditWardPatientComponent } from './edit-ward-patient/edit-ward-patient.component';
import { WardPatientFormComponent } from './ward-patient-form/ward-patient-form.component';


@NgModule({
  declarations: [
    WardsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllWardsComponent,
    NewWardComponent,
    ViewWardComponent,
    WardFormComponent,
    WardPatientsComponent,
    AddWardPatientComponent,
    EditWardPatientComponent,
    WardPatientFormComponent
  ],
  imports: [
    CommonModule,
    WardsRoutingModule
  ]
})
export class WardsModule { }
