import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectReportComponent } from './select-report/select-report.component';



@NgModule({
  declarations: [
    SelectReportComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectReportComponent
  ]
})
export class ReportsWindowsModule { }
