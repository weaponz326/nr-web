import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrescriptionsPage } from './prescriptions.page';
import { AllPrescriptionsComponent } from './all-prescriptions/all-prescriptions.component';
import { ViewPrescriptionComponent } from './view-prescription/view-prescription.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: "",
    component: PrescriptionsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-prescriptions", component: AllPrescriptionsComponent },
      { path: "view-prescription", component: ViewPrescriptionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescriptionsRoutingModule { }
