import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { MainNavbarModule } from '../../components/main-navbar/main-navbar.module';

import { UserSettingsPage } from './user-settings.page';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { TwoFactorAuthComponent } from './two-factor-auth/two-factor-auth.component';


@NgModule({
  declarations: [
    UserSettingsPage,
    ChangePasswordComponent,
    ChangeEmailComponent,
    TwoFactorAuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    UserSettingsRoutingModule,
    MainNavbarModule
  ]
})
export class UserSettingsModule { }
