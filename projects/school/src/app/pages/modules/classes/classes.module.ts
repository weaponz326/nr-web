import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesPage } from './classes.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllClassesComponent } from './all-classes/all-classes.component';
import { NewClassComponent } from './new-class/new-class.component';
import { ViewClassComponent } from './view-class/view-class.component';
import { ClassFormComponent } from './class-form/class-form.component';
import { ClassStudentsComponent } from './class-students/class-students.component';
import { ClassSubjectsComponent } from './class-subjects/class-subjects.component';
import { AllDepartmentsComponent } from './all-departments/all-departments.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';


@NgModule({
  declarations: [
    ClassesPage,
    DashboardComponent,
    ConfigurationComponent,
    AllClassesComponent,
    NewClassComponent,
    ViewClassComponent,
    ClassFormComponent,
    ClassStudentsComponent,
    ClassSubjectsComponent,
    AllDepartmentsComponent,
    AddDepartmentComponent,
    EditDepartmentComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule
  ]
})
export class ClassesModule { }
