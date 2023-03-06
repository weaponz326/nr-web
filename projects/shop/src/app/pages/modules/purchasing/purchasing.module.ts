import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PurchasingRoutingModule } from './purchasing-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SuppliersWindowsModule } from '../../../components/select-windows/suppliers-windows/suppliers-windows.module';
import { ProductsWindowsModule } from '../../../components/select-windows/products-windows/products-windows.module';

import { PurchasingPage } from './purchasing.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllPurchasingComponent } from './all-purchasing/all-purchasing.component';
import { NewPurchasingComponent } from './new-purchasing/new-purchasing.component';
import { ViewPurchasingComponent } from './view-purchasing/view-purchasing.component';
import { PurchasingItemsComponent } from './purchasing-items/purchasing-items.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemFormComponent } from './item-form/item-form.component';


@NgModule({
  declarations: [
    PurchasingPage,
    DashboardComponent,
    ConfigurationComponent,
    AllPurchasingComponent,
    NewPurchasingComponent,
    ViewPurchasingComponent,
    PurchasingItemsComponent,
    AddItemComponent,
    EditItemComponent,
    ItemFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PurchasingRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    SuppliersWindowsModule,
    ProductsWindowsModule
  ]
})
export class PurchasingModule { }
