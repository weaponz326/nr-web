import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AccessFormComponent } from './access-form/access-form.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchDetailComponent } from './search-detail/search-detail.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { ViewInvitationComponent } from './view-invitation/view-invitation.component';


@NgModule({
  declarations: [
    AdminPage,
    DashboardComponent,
    AllUsersComponent,
    ViewUserComponent,
    AccessFormComponent,
    UserSearchComponent,
    SearchResultsComponent,
    SearchDetailComponent,
    InvitationsComponent,
    ViewInvitationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
