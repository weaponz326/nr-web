import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeliveriesPage } from './deliveries.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllDeliveriesComponent } from './all-deliveries/all-deliveries.component';
import { EditDeliveryComponent } from './edit-delivery/edit-delivery.component';
import { NewDeliveryComponent } from './new-delivery/new-delivery.component';

import { ViewDeliveryGuard } from '../../../guards/modules/deliveries/view-delivery/view-delivery.guard';
import { ConfigAccessGuard } from '../../../guards/access/config-access/config-access.guard';

const routes: Routes = [
  {
    path: "",
    component: DeliveriesPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent, canActivate: [ConfigAccessGuard] },
      { path: "all-deliveries", component: AllDeliveriesComponent },
      { path: "add-delivery", component: NewDeliveryComponent },
      { path: "view-delivery", component: EditDeliveryComponent, canActivate: [ViewDeliveryGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveriesRoutingModule { }
