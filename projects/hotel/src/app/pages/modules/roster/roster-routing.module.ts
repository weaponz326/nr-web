import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RosterPage } from './roster.page';
import { AllRosterComponent } from './all-roster/all-roster.component';
import { NewRosterComponent } from './new-roster/new-roster.component';
import { ViewRosterComponent } from './view-roster/view-roster.component';
import { ManageBatchesComponent } from './manage-batches/manage-batches.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: "",
    component: RosterPage,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-rosters", component: AllRosterComponent },
      { path: "new-roster", component: NewRosterComponent },
      { path: "view-roster", component: ViewRosterComponent },
      { path: "manage-batches", component: ManageBatchesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RosterRoutingModule { }
