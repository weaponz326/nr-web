import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectAppraisalComponent } from './select-appraisal/select-appraisal.component';



@NgModule({
  declarations: [
    SelectAppraisalComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ]
})
export class AppraisalWindowsModule { }
