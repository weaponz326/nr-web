import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StudentsRoutingModule } from './students-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

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
    FormsModule,
    ReactiveFormsModule,
    StudentsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class StudentsModule { }
