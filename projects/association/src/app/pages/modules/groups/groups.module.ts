import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GroupsRoutingModule } from './groups-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

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
    FormsModule,
    ReactiveFormsModule,
    GroupsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule
  ]
})
export class GroupsModule { }
