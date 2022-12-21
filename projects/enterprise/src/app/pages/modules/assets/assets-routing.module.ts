import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssetsPage } from './assets.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllAssetsComponent } from './all-assets/all-assets.component';
import { NewAssetComponent } from './new-asset/new-asset.component';
import { ViewAssetComponent } from './view-asset/view-asset.component';

const routes: Routes = [
  {
    path: "",
    component: AssetsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-assets", component: AllAssetsComponent },
      { path: "new-asset", component: NewAssetComponent },
      { path: "view-asset", component: ViewAssetComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
