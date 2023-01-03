import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HousekeepingPage } from './housekeeping.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllHousekeepingComponent } from './all-housekeeping/all-housekeeping.component';
import { ViewHousekeepingComponent } from './view-housekeeping/view-housekeeping.component';


const routes: Routes = [
  {
    path: "",
    component: HousekeepingPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'all-housekeeping', component: AllHousekeepingComponent },
      { path: 'view-housekeeping', component: ViewHousekeepingComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HousekeepingRoutingModule { }
