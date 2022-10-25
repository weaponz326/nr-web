import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectLessonPlanComponent } from './select-lesson-plan/select-lesson-plan.component';



@NgModule({
  declarations: [
    SelectLessonPlanComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectLessonPlanComponent
  ]
})
export class LessonPlanWindowsModule { }
