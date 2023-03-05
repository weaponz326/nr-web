import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { CustomersWindowsModule } from '../../../components/select-windows/customers-windows/customers-windows.module';
import { ProductsWindowsModule } from '../../../components/select-windows/products-windows/products-windows.module';

import { InvoicePage } from './invoice.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllInvoiceComponent } from './all-invoice/all-invoice.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { InvoiceItemsComponent } from './invoice-items/invoice-items.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemFormComponent } from './item-form/item-form.component';


@NgModule({
  declarations: [
    InvoicePage,
    DashboardComponent,
    ConfigurationComponent,
    AllInvoiceComponent,
    NewInvoiceComponent,
    ViewInvoiceComponent,
    InvoiceItemsComponent,
    AddItemComponent,
    EditItemComponent,
    ItemFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InvoiceRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    CustomersWindowsModule,
    ProductsWindowsModule
  ]
})
export class InvoiceModule { }
