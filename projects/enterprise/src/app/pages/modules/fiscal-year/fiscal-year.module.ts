import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiscalYearRoutingModule } from './fiscal-year-routing.module';
import { FiscalYearPage } from './fiscal-year.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllYearsComponent } from './all-years/all-years.component';
import { AddYearComponent } from './add-year/add-year.component';
import { EditYearComponent } from './edit-year/edit-year.component';
import { YearFormComponent } from './year-form/year-form.component';


@NgModule({
  declarations: [
    FiscalYearPage,
    DashboardComponent,
    ConfigurationComponent,
    AllYearsComponent,
    AddYearComponent,
    EditYearComponent,
    YearFormComponent
  ],
  imports: [
    CommonModule,
    FiscalYearRoutingModule
  ]
})
export class FiscalYearModule { }
