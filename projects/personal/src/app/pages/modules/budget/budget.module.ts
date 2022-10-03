import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BudgetRoutingModule } from './budget-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from '../../../components/module-utilities/module-utilities.module';

import { BudgetPage } from './budget.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllBudgetComponent } from './all-budget/all-budget.component';
import { NewBudgetComponent } from './new-budget/new-budget.component';
import { ViewBudgetComponent } from './view-budget/view-budget.component';
import { BudgetTablesComponent } from './budget-tables/budget-tables.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { AddExpenditureComponent } from './add-expenditure/add-expenditure.component';
import { EditIncomeComponent } from './edit-income/edit-income.component';
import { EditExpenditureComponent } from './edit-expenditure/edit-expenditure.component';
import { ConfigurationComponent } from './configuration/configuration.component';


@NgModule({
  declarations: [
    BudgetPage,
    DashboardComponent,
    AllBudgetComponent,
    NewBudgetComponent,
    ViewBudgetComponent,
    BudgetTablesComponent,
    AddIncomeComponent,
    AddExpenditureComponent,
    EditIncomeComponent,
    EditExpenditureComponent,
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    BudgetRoutingModule
  ]
})
export class BudgetModule { }
