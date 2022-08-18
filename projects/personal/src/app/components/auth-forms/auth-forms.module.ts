import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { FormHeaderComponent } from './form-header/form-header.component';
import { FormFooterComponent } from './form-footer/form-footer.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RecoveryFormComponent } from './recovery-form/recovery-form.component';



@NgModule({
  declarations: [
    FormHeaderComponent,
    FormFooterComponent,
    SignupFormComponent,
    LoginFormComponent,
    RecoveryFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
  ],
  exports: [
    FormHeaderComponent,
    FormFooterComponent,
  ]
})
export class AuthFormsModule { }
