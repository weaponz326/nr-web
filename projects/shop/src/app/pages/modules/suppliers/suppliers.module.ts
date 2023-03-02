import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersPage } from './suppliers.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllSuppliersComponent } from './all-suppliers/all-suppliers.component';
import { NewSupplierComponent } from './new-supplier/new-supplier.component';
import { ViewSupplierComponent } from './view-supplier/view-supplier.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SupplierProductsComponent } from './supplier-products/supplier-products.component';


@NgModule({
  declarations: [
    SuppliersPage,
    DashboardComponent,
    ConfigurationComponent,
    AllSuppliersComponent,
    NewSupplierComponent,
    ViewSupplierComponent,
    SupplierFormComponent,
    SupplierProductsComponent
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule
  ]
})
export class SuppliersModule { }
