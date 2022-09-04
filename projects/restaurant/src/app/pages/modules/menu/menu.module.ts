import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuPage } from './menu.page';
import { AllMenuGroupsComponent } from './all-menu-groups/all-menu-groups.component';
import { NewMenuGroupComponent } from './new-menu-group/new-menu-group.component';
import { AllMenuItemsComponent } from './all-menu-items/all-menu-items.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { AddMenuItemComponent } from './add-menu-item/add-menu-item.component';
import { ViewMenuItemComponent } from './view-menu-item/view-menu-item.component';
import { MenuItemFormComponent } from './menu-item-form/menu-item-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    MenuPage,
    AllMenuGroupsComponent,
    NewMenuGroupComponent,
    AllMenuItemsComponent,
    MenuItemsComponent,
    AddMenuItemComponent,
    ViewMenuItemComponent,
    MenuItemFormComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
