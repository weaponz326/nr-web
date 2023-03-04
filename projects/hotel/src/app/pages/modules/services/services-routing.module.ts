import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServicesPage } from './services.page';
import { AllServicesComponent } from './all-services/all-services.component';
import { ViewServiceComponent } from './view-service/view-service.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: "",
    component: ServicesPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-services", component: AllServicesComponent },
      { path: "view-service", component: ViewServiceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
