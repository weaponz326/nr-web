import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasingRoutingModule } from './purchasing-routing.module';
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
    PurchasingRoutingModule
  ]
})
export class PurchasingModule { }
