import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { RegisterRoutingModule } from './register-routing.module';
import { MainNavbarModule } from 'projects/personal/src/app/components/main-navbar/main-navbar.module';
import { AuthFormsModule } from 'projects/personal/src/app/components/auth-forms/auth-forms.module';

import { RegisterPage } from './register.page';


@NgModule({
  declarations: [
    RegisterPage
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MainNavbarModule,
    AuthFormsModule,
  ]
})
export class RegisterModule { }
