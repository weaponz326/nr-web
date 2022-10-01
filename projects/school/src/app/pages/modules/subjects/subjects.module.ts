import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectsRoutingModule } from './subjects-routing.module';
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
    SubjectsRoutingModule
  ]
})
export class SubjectsModule { }
