import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersPage } from './teachers.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { NewTeacherComponent } from './new-teacher/new-teacher.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';


@NgModule({
  declarations: [
    TeachersPage,
    DashboardComponent,
    ConfigurationComponent,
    AllTeachersComponent,
    NewTeacherComponent,
    ViewTeacherComponent,
    TeacherFormComponent
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule
  ]
})
export class TeachersModule { }
