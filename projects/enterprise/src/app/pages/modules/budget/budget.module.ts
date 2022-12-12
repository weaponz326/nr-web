import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetPage } from './budget.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllBudgetComponent } from './all-budget/all-budget.component';
import { NewBudgetComponent } from './new-budget/new-budget.component';
import { ViewBudgetComponent } from './view-budget/view-budget.component';
import { BudgetTablesComponent } from './budget-tables/budget-tables.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { EditIncomeComponent } from './edit-income/edit-income.component';
import { AddExpenditureComponent } from './add-expenditure/add-expenditure.component';
import { EditExpenditureComponent } from './edit-expenditure/edit-expenditure.component';


@NgModule({
  declarations: [
    BudgetPage,
    DashboardComponent,
    ConfigurationComponent,
    AllBudgetComponent,
    NewBudgetComponent,
    ViewBudgetComponent,
    BudgetTablesComponent,
    AddIncomeComponent,
    EditIncomeComponent,
    AddExpenditureComponent,
    EditExpenditureComponent
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule
  ]
})
export class BudgetModule { }
