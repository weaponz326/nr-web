import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MainNavbarModule } from '../../components/main-navbar/main-navbar.module';
import { AuthFormsModule } from '../../components/auth-forms/auth-forms.module';

import { AuthPage } from './auth.page';


@NgModule({
  declarations: [
    AuthPage
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MainNavbarModule,
    AuthFormsModule
  ]
})
export class AuthModule { }
