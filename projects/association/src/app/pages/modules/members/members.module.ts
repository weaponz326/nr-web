import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MembersRoutingModule } from './members-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { MembersPage } from './members.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllMembersComponent } from './all-members/all-members.component';
import { NewMemberComponent } from './new-member/new-member.component';
import { ViewMemberComponent } from './view-member/view-member.component';
import { MemberFormComponent } from './member-form/member-form.component';


@NgModule({
  declarations: [
    MembersPage,
    DashboardComponent,
    ConfigurationComponent,
    AllMembersComponent,
    NewMemberComponent,
    ViewMemberComponent,
    MemberFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MembersRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule
  ]
})
export class MembersModule { }
