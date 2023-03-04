import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiagnosisPage } from './diagnosis.page';
import { AllDiagnosisComponent } from './all-diagnosis/all-diagnosis.component';
import { ViewDiagnosisComponent } from './view-diagnosis/view-diagnosis.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: "",
    component: DiagnosisPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-diagnosis", component: AllDiagnosisComponent },
      { path: "view-diagnosis", component: ViewDiagnosisComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagnosisRoutingModule { }
