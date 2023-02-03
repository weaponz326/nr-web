import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosisRoutingModule } from './diagnosis-routing.module';
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
    DiagnosisRoutingModule
  ]
})
export class DiagnosisModule { }
