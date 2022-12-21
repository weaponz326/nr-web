import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClassesRoutingModule } from './classes-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';
import { TermsWindowsModule } from '../../../components/select-windows/terms-windows/terms-windows.module';
import { ClassesWindowsModule } from '../../../components/select-windows/classes-windows/classes-windows.module';
import { TeachersWindowsModule } from '../../../components/select-windows/teachers-windows/teachers-windows.module';

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
import { DepartmentFormComponent } from './department-form/department-form.component';


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
    EditDepartmentComponent,
    DepartmentFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClassesRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    TermsWindowsModule,
    ClassesWindowsModule,
    TeachersWindowsModule
  ]
})
export class ClassesModule { }
