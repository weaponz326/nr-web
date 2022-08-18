import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormHeaderComponent } from './components/auth-forms/form-header/form-header.component';
import { FormFooterComponent } from './components/auth-forms/form-footer/form-footer.component';
import { SignupFormComponent } from './components/auth-forms/signup-form/signup-form.component';
import { LoginFormComponent } from './components/auth-forms/login-form/login-form.component';
import { RecoveryFormComponent } from './components/auth-forms/recovery-form/recovery-form.component';
import { ResetFormComponent } from './components/auth-forms/reset-form/reset-form.component';


@NgModule({
  declarations: [
    AppComponent,
    FormHeaderComponent,
    FormFooterComponent,
    SignupFormComponent,
    LoginFormComponent,
    RecoveryFormComponent,
    ResetFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
