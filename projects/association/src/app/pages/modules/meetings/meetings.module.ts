import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingsRoutingModule } from './meetings-routing.module';
import { MeetingsPage } from './meetings.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllMeetingsComponent } from './all-meetings/all-meetings.component';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { ViewMeetingComponent } from './view-meeting/view-meeting.component';
import { MeetingFormComponent } from './meeting-form/meeting-form.component';


@NgModule({
  declarations: [
    MeetingsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllMeetingsComponent,
    AddMeetingComponent,
    ViewMeetingComponent,
    MeetingFormComponent
  ],
  imports: [
    CommonModule,
    MeetingsRoutingModule
  ]
})
export class MeetingsModule { }
