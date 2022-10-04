import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuPage } from './menu.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllMenuGroupsComponent } from './all-menu-groups/all-menu-groups.component';
import { ViewMenuGroupComponent } from './view-menu-group/view-menu-group.component';
import { AllMenuItemsComponent } from './all-menu-items/all-menu-items.component';

import { ViewMenuGroupGuard } from '../../../guards/modules/menu/view-menu-group/view-menu-group.guard';

const routes: Routes = [
  {
    path: "",
    component: MenuPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-menu-groups", component: AllMenuGroupsComponent },
      { path: "view-menu-group", component: ViewMenuGroupComponent, canActivate: [ViewMenuGroupGuard] },
      { path: "all-menu-items", component: AllMenuItemsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
