import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentsPage } from './students.page';
import { AllStudentsComponent } from './all-students/all-students.component';
import { NewStudentComponent } from './new-student/new-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: "",
    component: StudentsPage,
    children: [
      { path: "", component: AllStudentsComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-students", component: AllStudentsComponent },
      { path: "new-student", component: NewStudentComponent },
      { path: "view-student", component: ViewStudentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
