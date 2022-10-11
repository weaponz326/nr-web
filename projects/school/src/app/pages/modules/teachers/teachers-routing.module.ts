import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeachersPage } from './teachers.page';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { NewTeacherComponent } from './new-teacher/new-teacher.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [
  {
    path: "",
    component: TeachersPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-teachers", component: AllTeachersComponent },
      { path: "new-teacher", component: NewTeacherComponent },
      { path: "view-teacher", component: ViewTeacherComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
