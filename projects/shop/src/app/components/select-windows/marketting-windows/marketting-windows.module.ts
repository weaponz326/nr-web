import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectCampaignComponent } from './select-campaign/select-campaign.component';



@NgModule({
  declarations: [
    SelectCampaignComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectCampaignComponent
  ]
})
export class MarkettingWindowsModule { }
