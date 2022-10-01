import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
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
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
