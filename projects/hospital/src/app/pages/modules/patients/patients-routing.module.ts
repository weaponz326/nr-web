import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientsPage } from './patients.page';
import { AllPatientsComponent } from './all-patients/all-patients.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: "",
    component: PatientsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-patients", component: AllPatientsComponent },
      { path: "new-patient", component: NewPatientComponent },
      { path: "view-patient", component: ViewPatientComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
