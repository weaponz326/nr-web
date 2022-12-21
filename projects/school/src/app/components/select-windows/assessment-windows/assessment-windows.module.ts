import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectAssessmentComponent } from './select-assessment/select-assessment.component';



@NgModule({
  declarations: [
    SelectAssessmentComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectAssessmentComponent
  ],
})
export class AssessmentWindowsModule { }
