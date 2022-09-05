import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PortalRoutingModule } from './portal-routing.module';
import { MainNavbarModule } from 'projects/personal/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { PortalPage } from './portal.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchViewComponent } from './search-view/search-view.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchDetailComponent } from './search-detail/search-detail.component';
import { TimelineComponent } from './timeline/timeline.component';
import { NewRinkComponent } from './new-rink/new-rink.component';
import { ViewRinkComponent } from './view-rink/view-rink.component';


@NgModule({
  declarations: [
    PortalPage,
    DashboardComponent,
    SearchViewComponent,
    SearchResultsComponent,
    SearchDetailComponent,
    TimelineComponent,
    NewRinkComponent,
    ViewRinkComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PortalRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class PortalModule { }
