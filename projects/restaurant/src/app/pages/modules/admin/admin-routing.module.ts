import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPage } from './admin.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { UserSearchComponent } from './user-search/user-search.component';

import { ViewUserGuard } from '../../../guards/modules/admin/view-user/view-user.guard';


const routes: Routes = [
  {
    path: "",
    component: AdminPage,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'all-users', component: AllUsersComponent },
      { path: 'view-user', component: ViewUserComponent, canActivate: [ViewUserGuard] },
      { path: 'invitations', component: InvitationsComponent },
      { path: 'search', component: UserSearchComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
