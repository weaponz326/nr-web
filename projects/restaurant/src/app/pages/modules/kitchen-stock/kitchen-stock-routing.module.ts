import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KitchenStockPage } from './kitchen-stock.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllStockItemsComponent } from './all-stock-items/all-stock-items.component';

import { ConfigAccessGuard } from '../../../guards/access/config-access/config-access.guard';


const routes: Routes = [
  {
    path: "",
    component: KitchenStockPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent, canActivate: [ConfigAccessGuard] },
      { path: "all-stock-items", component: AllStockItemsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitchenStockRoutingModule { }
