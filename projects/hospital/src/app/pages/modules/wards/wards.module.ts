import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WardsRoutingModule } from './wards-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

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
    FormsModule,
    ReactiveFormsModule,
    WardsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class WardsModule { }
