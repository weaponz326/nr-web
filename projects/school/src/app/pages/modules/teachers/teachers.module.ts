import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TeachersRoutingModule } from './teachers-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

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
    FormsModule,
    ReactiveFormsModule,
    TeachersRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class TeachersModule { }
