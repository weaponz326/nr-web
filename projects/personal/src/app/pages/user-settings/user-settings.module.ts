import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSettingsRoutingModule } from './user-settings-routing.module';
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
    UserSettingsRoutingModule
  ]
})
export class UserSettingsModule { }
