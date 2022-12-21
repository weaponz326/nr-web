import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MembersPage } from './members.page';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllMembersComponent } from './all-members/all-members.component';
import { NewMemberComponent } from './new-member/new-member.component';
import { ViewMemberComponent } from './view-member/view-member.component';

const routes: Routes = [
  {
    path: "",
    component: MembersPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-members", component: AllMembersComponent },
      { path: "new-member", component: NewMemberComponent },
      { path: "view-member", component: ViewMemberComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
