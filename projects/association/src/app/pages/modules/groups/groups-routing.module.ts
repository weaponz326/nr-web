import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupsPage } from './groups.page';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllGroupsComponent } from './all-groups/all-groups.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { ViewGroupComponent } from './view-group/view-group.component';

const routes: Routes = [
  {
    path: "",
    component: GroupsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-groups", component: AllGroupsComponent },
      { path: "new-group", component: NewGroupComponent },
      { path: "view-group", component: ViewGroupComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
