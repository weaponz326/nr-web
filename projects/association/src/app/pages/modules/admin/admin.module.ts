import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

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
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class AdminModule { }
