import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsRoutingModule } from './terms-routing.module';
import { TermsPage } from './terms.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllTermsComponent } from './all-terms/all-terms.component';
import { NewTermComponent } from './new-term/new-term.component';
import { ViewTermComponent } from './view-term/view-term.component';
import { TermFormComponent } from './term-form/term-form.component';


@NgModule({
  declarations: [
    TermsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllTermsComponent,
    NewTermComponent,
    ViewTermComponent,
    TermFormComponent
  ],
  imports: [
    CommonModule,
    TermsRoutingModule
  ]
})
export class TermsModule { }
