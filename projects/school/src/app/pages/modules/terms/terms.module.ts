import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TermsRoutingModule } from './terms-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

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
    FormsModule,
    ReactiveFormsModule,
    TermsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class TermsModule { }
