import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FiscalYearRoutingModule } from './fiscal-year-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { FiscalYearPage } from './fiscal-year.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllYearsComponent } from './all-years/all-years.component';
import { AddYearComponent } from './add-year/add-year.component';
import { ViewYearComponent } from './view-year/view-year.component';
import { YearFormComponent } from './year-form/year-form.component';


@NgModule({
  declarations: [
    FiscalYearPage,
    DashboardComponent,
    ConfigurationComponent,
    AllYearsComponent,
    AddYearComponent,
    ViewYearComponent,
    YearFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FiscalYearRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule
  ]
})
export class FiscalYearModule { }
