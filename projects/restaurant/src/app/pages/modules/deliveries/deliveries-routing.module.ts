import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeliveriesPage } from './deliveries.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllDeliveriesComponent } from './all-deliveries/all-deliveries.component';
import { EditDeliveryComponent } from './edit-delivery/edit-delivery.component';
import { NewDeliveryComponent } from './new-delivery/new-delivery.component';

const routes: Routes = [
  {
    path: "",
    component: DeliveriesPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "all-deliveries", component: AllDeliveriesComponent },
      { path: "add-delivery", component: NewDeliveryComponent },
      { path: "view-delivery", component: EditDeliveryComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveriesRoutingModule { }
