import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsPage } from './groups.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllGroupsComponent } from './all-groups/all-groups.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { GroupMembersComponent } from './group-members/group-members.component';


@NgModule({
  declarations: [
    GroupsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllGroupsComponent,
    NewGroupComponent,
    ViewGroupComponent,
    GroupFormComponent,
    GroupMembersComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule
  ]
})
export class GroupsModule { }
