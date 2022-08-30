import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetPage } from './budget.page';
import { AllBudgetComponent } from './all-budget/all-budget.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewBudgetComponent } from './view-budget/view-budget.component';

import { ViewBudgetGuard } from '../../../guards/modules/budget/view-budget/view-budget.guard';


const routes: Routes = [
  {
    path: "",
    component: BudgetPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "all-budget", component: AllBudgetComponent },
      { path: "view-budget", component: ViewBudgetComponent, canActivate: [ViewBudgetGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
