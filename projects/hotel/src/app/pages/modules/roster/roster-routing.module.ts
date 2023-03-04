import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RosterPage } from './roster.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllRosterComponent } from './all-roster/all-roster.component';
import { ViewRosterComponent } from './view-roster/view-roster.component';
import { ManageBatchesComponent } from './manage-batches/manage-batches.component';

// import { ViewRosterGuard } from '../../../guards/modules/roster/view-roster/view-roster.guard';
// import { ConfigAccessGuard } from '../../../guards/access/config-access/config-access.guard';

const routes: Routes = [
  {
    path: "",
    component: RosterPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-roster", component: AllRosterComponent },
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
