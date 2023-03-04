import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CashflowRoutingModule } from './cashflow-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { CashflowPage } from './cashflow.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllSheetsComponent } from './all-sheets/all-sheets.component';
import { NewSheetComponent } from './new-sheet/new-sheet.component';
import { ViewSheetComponent } from './view-sheet/view-sheet.component';
import { AddInflowComponent } from './add-inflow/add-inflow.component';
import { AddOutflowComponent } from './add-outflow/add-outflow.component';
import { DailyComponent } from './sheet-types/daily/daily.component';
import { WeeklyComponent } from './sheet-types/weekly/weekly.component';
import { MonthlyComponent } from './sheet-types/monthly/monthly.component';
import { QuarterlyComponent } from './sheet-types/quarterly/quarterly.component';


@NgModule({
  declarations: [
    CashflowPage,
    DashboardComponent,
    ConfigurationComponent,
    AllSheetsComponent,
    NewSheetComponent,
    ViewSheetComponent,
    AddInflowComponent,
    AddOutflowComponent,
    DailyComponent,
    WeeklyComponent,
    MonthlyComponent,
    QuarterlyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CashflowRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class CashflowModule { }
