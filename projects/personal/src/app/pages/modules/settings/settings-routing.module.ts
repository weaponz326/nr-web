import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllAccountsComponent } from './all-accounts/all-accounts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: "",
    component: SettingsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "profile", component: ProfileComponent },
      { path: "all-accounts", component: AllAccountsComponent },
      { path: "invitations", component: InvitationsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
