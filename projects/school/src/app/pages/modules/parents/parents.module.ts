import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ParentsRoutingModule } from './parents-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';
import { StudentsWindowsModule } from '../../../components/select-windows/students-windows/students-windows.module';

import { ParentsPage } from './parents.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllParentsComponent } from './all-parents/all-parents.component';
import { NewParentComponent } from './new-parent/new-parent.component';
import { ViewParentComponent } from './view-parent/view-parent.component';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { ParentWardsComponent } from './parent-wards/parent-wards.component';


@NgModule({
  declarations: [
    ParentsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllParentsComponent,
    NewParentComponent,
    ViewParentComponent,
    ParentFormComponent,
    ParentWardsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ParentsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    StudentsWindowsModule
  ]
})
export class ParentsModule { }
