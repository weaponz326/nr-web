import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReportsRoutingModule } from './reports-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { ReportsPage } from './reports.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllReportsComponent } from './all-reports/all-reports.component';
import { NewReportComponent } from './new-report/new-report.component';
import { ClassReportComponent } from './class-report/class-report.component';
import { ClassSheetComponent } from './class-sheet/class-sheet.component';
import { ReportAssessmentsComponent } from './report-assessments/report-assessments.component';
import { StudentReportComponent } from './student-report/student-report.component';


@NgModule({
  declarations: [
    ReportsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllReportsComponent,
    NewReportComponent,
    ClassReportComponent,
    ClassSheetComponent,
    ReportAssessmentsComponent,
    StudentReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class ReportsModule { }
