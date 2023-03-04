import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarkettingPage } from '../marketting/marketting.page';
import { AllCampaignsComponent } from '../marketting/all-campaigns/all-campaigns.component';
import { NewCampaignComponent } from '../marketting/new-campaign/new-campaign.component';
import { ViewCampaignComponent } from '../marketting/view-campaign/view-campaign.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "", 
    component: MarkettingPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-campaigns", component: AllCampaignsComponent },
      { path: "new-campaign", component: NewCampaignComponent },
      { path: "view-campaign", component: ViewCampaignComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarkettingRoutingModule { }
