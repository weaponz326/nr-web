import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdersPage } from './orders.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';

import { ViewOrderGuard } from '../../../guards/modules/orders/view-order/view-order.guard';
import { ConfigAccessGuard } from '../../../guards/access/config-access/config-access.guard';

const routes: Routes = [
  {
    path: "",
    component: OrdersPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent, canActivate: [ConfigAccessGuard] },
      { path: "all-orders", component: AllOrdersComponent },
      { path: "view-order", component: ViewOrderComponent, canActivate: [ViewOrderGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
