import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TimetablePage } from './timetable.page';
import { AllTimetableComponent } from './all-timetable/all-timetable.component';
import { FullTimetableComponent } from './full-timetable/full-timetable.component';
import { NewTimetableComponent } from './new-timetable/new-timetable.component';
import { ClassTimetableComponent } from './class-timetable/class-timetable.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: "",
    component: TimetablePage,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-timetable", component: AllTimetableComponent },
      { path: "new-timetable", component: NewTimetableComponent },
      { path: "full-timetable", component: FullTimetableComponent },
      { path: "class-timetable", component: ClassTimetableComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimetableRoutingModule { }
