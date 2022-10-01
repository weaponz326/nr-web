import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SubjectsPage } from './subjects.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllSubjectsComponent } from './all-subjects/all-subjects.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { ViewSubjectComponent } from './view-subject/view-subject.component';
import { SubjectFormComponent } from './subject-form/subject-form.component';
import { SubjectTeachersComponent } from './subject-teachers/subject-teachers.component';


@NgModule({
  declarations: [
    SubjectsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllSubjectsComponent,
    AddSubjectComponent,
    ViewSubjectComponent,
    SubjectFormComponent,
    SubjectTeachersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SubjectsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class SubjectsModule { }
