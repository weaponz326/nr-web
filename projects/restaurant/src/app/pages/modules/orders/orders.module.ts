import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { MainNavbarModule } from 'projects/personal/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';
import { CustomersWindowsModule } from '../../../components/select-windows/customers-windows/customers-windows.module';
import { TablesWindowsModule } from '../../../components/select-windows/tables-windows/tables-windows.module';
import { MenuWindowsModule } from '../../../components/select-windows/menu-windows/menu-windows.module';

import { OrdersPage } from './orders.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemFormComponent } from './item-form/item-form.component';


@NgModule({
  declarations: [
    OrdersPage,
    DashboardComponent,
    AllOrdersComponent,
    AddOrderComponent,
    ViewOrderComponent,
    OrderItemsComponent,
    AddItemComponent,
    EditItemComponent,
    ItemFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    CustomersWindowsModule,
    TablesWindowsModule,
    MenuWindowsModule
  ]
})
export class OrdersModule { }
