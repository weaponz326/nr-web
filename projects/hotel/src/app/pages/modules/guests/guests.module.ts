import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestsRoutingModule } from './guests-routing.module';
import { GuestsPage } from './guests.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllGuestsComponent } from './all-guests/all-guests.component';
import { NewGuestComponent } from './new-guest/new-guest.component';
import { ViewGuestComponent } from './view-guest/view-guest.component';
import { GuestFormComponent } from './guest-form/guest-form.component';


@NgModule({
  declarations: [
    GuestsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllGuestsComponent,
    NewGuestComponent,
    ViewGuestComponent,
    GuestFormComponent
  ],
  imports: [
    CommonModule,
    GuestsRoutingModule
  ]
})
export class GuestsModule { }
