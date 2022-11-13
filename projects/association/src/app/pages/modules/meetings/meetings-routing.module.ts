import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MeetingsPage } from './meetings.page';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllMeetingsComponent } from './all-meetings/all-meetings.component';
import { ViewMeetingComponent } from './view-meeting/view-meeting.component';

const routes: Routes = [
  {
    path: "",
    component: MeetingsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-meetings", component: AllMeetingsComponent },
      { path: "view-meeting", component: ViewMeetingComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingsRoutingModule { }
