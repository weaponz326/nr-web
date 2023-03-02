import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PurchasingPage } from './purchasing.page';
import { AllPurchasingComponent } from './all-purchasing/all-purchasing.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewPurchasingComponent } from './view-purchasing/view-purchasing.component';

const routes: Routes = [
  {
    path: "",
    component: PurchasingPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-purchasing", component: AllPurchasingComponent },
      { path: "view-purchasing", component: ViewPurchasingComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasingRoutingModule { }
