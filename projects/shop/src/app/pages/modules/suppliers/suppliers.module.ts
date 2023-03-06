import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { ProductsWindowsModule } from '../../../components/select-windows/products-windows/products-windows.module';

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
    FormsModule,
    ReactiveFormsModule,
    SuppliersRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    ProductsWindowsModule
  ]
})
export class SuppliersModule { }
