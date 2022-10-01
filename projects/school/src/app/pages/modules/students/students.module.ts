import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsPage } from './students.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { NewStudentComponent } from './new-student/new-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { StudentFormComponent } from './student-form/student-form.component';


@NgModule({
  declarations: [
    StudentsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllStudentsComponent,
    NewStudentComponent,
    ViewStudentComponent,
    StudentFormComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }
