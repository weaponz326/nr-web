import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpInfoRoutingModule } from './help-info-routing.module';
import { HelpInfoPage } from './help-info.page';


@NgModule({
  declarations: [
    HelpInfoPage
  ],
  imports: [
    CommonModule,
    HelpInfoRoutingModule
  ]
})
export class HelpInfoModule { }
