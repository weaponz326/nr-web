import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommitteesRoutingModule } from './committees-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';
import { MembersWindowsModule } from '../../../components/select-windows/members-windows/members-windows.module';

import { CommitteesPage } from './committees.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllCommitteesComponent } from './all-committees/all-committees.component';
import { NewCommitteeComponent } from './new-committee/new-committee.component';
import { ViewCommitteeComponent } from './view-committee/view-committee.component';
import { CommitteeFormComponent } from './committee-form/committee-form.component';
import { CommitteeMembersComponent } from './committee-members/committee-members.component';


@NgModule({
  declarations: [
    CommitteesPage,
    DashboardComponent,
    ConfigurationComponent,
    AllCommitteesComponent,
    NewCommitteeComponent,
    ViewCommitteeComponent,
    CommitteeFormComponent,
    CommitteeMembersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommitteesRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    MembersWindowsModule
  ]
})
export class CommitteesModule { }
