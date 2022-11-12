import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
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
    MembersRoutingModule
  ]
})
export class MembersModule { }
