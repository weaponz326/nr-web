import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectBudgetComponent } from './select-budget/select-budget.component';



@NgModule({
  declarations: [
    SelectBudgetComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ]
})
export class BudgetWindowsModule { }
