import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KitchenStockRoutingModule } from './kitchen-stock-routing.module';
import { MainNavbarModule } from 'projects/personal/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

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
    FormsModule,
    ReactiveFormsModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    KitchenStockRoutingModule
  ]
})
export class KitchenStockModule { }
