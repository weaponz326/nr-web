import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { SettingsRoutingModule } from './settings-routing.module';
import { MainNavbarModule } from '../../../components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from '../../../components/module-utilities/module-utilities.module';

import { SettingsPage } from './settings.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AllAccountsComponent } from './all-accounts/all-accounts.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { BasicComponent } from './profile-content/basic/basic.component';
import { AdditionalComponent } from './profile-content/additional/additional.component';
import { PhotoComponent } from './profile-content/photo/photo.component';
import { ContactComponent } from './profile-content/contact/contact.component';
import { LocationComponent } from './profile-content/location/location.component';
import { ViewInvitationComponent } from './view-invitation/view-invitation.component';


@NgModule({
  declarations: [
    SettingsPage,
    DashboardComponent,
    ProfileComponent,
    AllAccountsComponent,
    InvitationsComponent,
    BasicComponent,
    AdditionalComponent,
    PhotoComponent,
    ContactComponent,
    LocationComponent,
    ViewInvitationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
