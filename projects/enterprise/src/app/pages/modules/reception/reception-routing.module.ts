import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReceptionPage } from './reception.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllVisitorsComponent } from './all-visitors/all-visitors.component';
import { AddVisitorComponent } from './add-visitor/add-visitor.component';
import { EditVisitorComponent } from './edit-visitor/edit-visitor.component';

const routes: Routes = [
  {
    path: "",
    component: ReceptionPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-visitors", component: AllVisitorsComponent },
      { path: "new-visitor", component: AddVisitorComponent },
      { path: "edit-visitor", component: EditVisitorComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }
