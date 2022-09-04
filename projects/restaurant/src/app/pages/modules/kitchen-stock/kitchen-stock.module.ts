import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitchenStockRoutingModule } from './kitchen-stock-routing.module';
import { KitchenStockPage } from './kitchen-stock.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllStockItemsComponent } from './all-stock-items/all-stock-items.component';
import { AddStockItemComponent } from './add-stock-item/add-stock-item.component';
import { EditStockItemComponent } from './edit-stock-item/edit-stock-item.component';
import { StockItemFormComponent } from './stock-item-form/stock-item-form.component';


@NgModule({
  declarations: [
    KitchenStockPage,
    DashboardComponent,
    AllStockItemsComponent,
    AddStockItemComponent,
    EditStockItemComponent,
    StockItemFormComponent
  ],
  imports: [
    CommonModule,
    KitchenStockRoutingModule
  ]
})
export class KitchenStockModule { }
