import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ExecutivesRoutingModule } from './executives-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';
import { MembersWindowsModule } from '../../../components/select-windows/members-windows/members-windows.module';
import { FiscalYearWindowsModule } from '../../../components/select-windows/fiscal-year-windows/fiscal-year-windows.module';

import { ExecutivesPage } from './executives.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllExecutivesComponent } from './all-executives/all-executives.component';
import { AddExecutiveComponent } from './add-executive/add-executive.component';
import { ViewExecutiveComponent } from './view-executive/view-executive.component';
import { ExecutiveFormComponent } from './executive-form/executive-form.component';


@NgModule({
  declarations: [
    ExecutivesPage,
    DashboardComponent,
    ConfigurationComponent,
    AllExecutivesComponent,
    AddExecutiveComponent,
    ViewExecutiveComponent,
    ExecutiveFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExecutivesRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    MembersWindowsModule,
    FiscalYearWindowsModule
  ]
})
export class ExecutivesModule { }
