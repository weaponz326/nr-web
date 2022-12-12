import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsPage } from './assets.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllAssetsComponent } from './all-assets/all-assets.component';
import { NewAssetComponent } from './new-asset/new-asset.component';
import { ViewAssetComponent } from './view-asset/view-asset.component';
import { AssetFormComponent } from './asset-form/asset-form.component';


@NgModule({
  declarations: [
    AssetsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllAssetsComponent,
    NewAssetComponent,
    ViewAssetComponent,
    AssetFormComponent
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule
  ]
})
export class AssetsModule { }
