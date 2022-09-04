import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuRoutingModule } from './menu-routing.module';
import { MainNavbarModule } from 'projects/personal/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { MenuPage } from './menu.page';
import { AllMenuGroupsComponent } from './all-menu-groups/all-menu-groups.component';
import { NewMenuGroupComponent } from './new-menu-group/new-menu-group.component';
import { AllMenuItemsComponent } from './all-menu-items/all-menu-items.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { AddMenuItemComponent } from './add-menu-item/add-menu-item.component';
import { MenuItemFormComponent } from './menu-item-form/menu-item-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewMenuGroupComponent } from './view-menu-group/view-menu-group.component';
import { EditMenuItemComponent } from './edit-menu-item/edit-menu-item.component';


@NgModule({
  declarations: [
    MenuPage,
    AllMenuGroupsComponent,
    NewMenuGroupComponent,
    AllMenuItemsComponent,
    MenuItemsComponent,
    AddMenuItemComponent,
    MenuItemFormComponent,
    DashboardComponent,
    ViewMenuGroupComponent,
    EditMenuItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
