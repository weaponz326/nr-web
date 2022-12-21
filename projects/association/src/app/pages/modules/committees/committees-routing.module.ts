import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommitteesPage } from './committees.page';
import { ViewCommitteeComponent } from './view-committee/view-committee.component';
import { NewCommitteeComponent } from './new-committee/new-committee.component';
import { AllCommitteesComponent } from './all-committees/all-committees.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: CommitteesPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-committees", component: AllCommitteesComponent },
      { path: "new-committee", component: NewCommitteeComponent },
      { path: "view-committee", component: ViewCommitteeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommitteesRoutingModule { }
