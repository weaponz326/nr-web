import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DiagnosisRoutingModule } from './diagnosis-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { PatientsWindowsModule } from '../../../components/select-windows/patients-windows/patients-windows.module';
import { AdmissionsWindowsModule } from '../../../components/select-windows/admissions-windows/admissions-windows.module';

import { DiagnosisPage } from './diagnosis.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllDiagnosisComponent } from './all-diagnosis/all-diagnosis.component';
import { NewDiagnosisComponent } from './new-diagnosis/new-diagnosis.component';
import { ViewDiagnosisComponent } from './view-diagnosis/view-diagnosis.component';
import { DiagnosisDetailsComponent } from './diagnosis-details/diagnosis-details.component';


@NgModule({
  declarations: [
    DiagnosisPage,
    DashboardComponent,
    ConfigurationComponent,
    AllDiagnosisComponent,
    NewDiagnosisComponent,
    ViewDiagnosisComponent,
    DiagnosisDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DiagnosisRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    PatientsWindowsModule,
    AdmissionsWindowsModule
  ]
})
export class DiagnosisModule { }
