import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportsPage } from './reports.page';
import { AllReportsComponent } from './all-reports/all-reports.component';
import { ClassReportComponent } from './class-report/class-report.component';
import { StudentReportComponent } from './student-report/student-report.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { NewReportComponent } from './new-report/new-report.component';

const routes: Routes = [
  {
    path: "",
    component: ReportsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-reports", component: AllReportsComponent },
      { path: "new-report", component: NewReportComponent },
      { path: "class-report", component: ClassReportComponent },
      { path: "student-report", component: StudentReportComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
