import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectActionPlanComponent } from './select-action-plan/select-action-plan.component';



@NgModule({
  declarations: [
    SelectActionPlanComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectActionPlanComponent
  ]
})
export class ActionPlanWindowsModule { }
