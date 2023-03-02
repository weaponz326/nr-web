import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkettingRoutingModule } from './marketting-routing.module';
import { MarkettingPage } from './marketting.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllCampaignsComponent } from './all-campaigns/all-campaigns.component';
import { NewCampaignComponent } from './new-campaign/new-campaign.component';
import { ViewCampaignComponent } from './view-campaign/view-campaign.component';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';


@NgModule({
  declarations: [
    MarkettingPage,
    DashboardComponent,
    ConfigurationComponent,
    AllCampaignsComponent,
    NewCampaignComponent,
    ViewCampaignComponent,
    CampaignFormComponent
  ],
  imports: [
    CommonModule,
    MarkettingRoutingModule
  ]
})
export class MarkettingModule { }
