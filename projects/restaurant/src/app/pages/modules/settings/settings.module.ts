import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { Angular4PaystackModule } from 'angular4-paystack';

import { SettingsRoutingModule } from './settings-routing.module';
import { MainNavbarModule } from 'projects/personal/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';
import { environment } from 'projects/restaurant/src/environments/environment';

import { SettingsPage } from './settings.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { BillingComponent } from './billing/billing.component';
import { BasicComponent } from './profile-content/basic/basic.component';
import { LogoComponent } from './profile-content/logo/logo.component';
import { LocationComponent } from './profile-content/location/location.component';
import { ContactComponent } from './profile-content/contact/contact.component';
import { PaymentsHistoryComponent } from './payments-history/payments-history.component';


@NgModule({
  declarations: [
    SettingsPage,
    DashboardComponent,
    ProfileComponent,
    BillingComponent,
    BasicComponent,
    LogoComponent,
    LocationComponent,
    ContactComponent,
    PaymentsHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    SettingsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    Angular4PaystackModule.forRoot(environment.paystackTestPublicKey),
  ]
})
export class SettingsModule { }
