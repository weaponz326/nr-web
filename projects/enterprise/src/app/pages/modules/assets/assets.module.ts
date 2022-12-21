import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AssetsRoutingModule } from './assets-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

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
    FormsModule,
    ReactiveFormsModule,
    AssetsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class AssetsModule { }
