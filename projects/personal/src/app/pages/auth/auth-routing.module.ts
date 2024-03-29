import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthPage } from './auth.page';
import { ActivateFormComponent } from '../../components/auth-forms/activate-form/activate-form.component';
import { LoginFormComponent } from '../../components/auth-forms/login-form/login-form.component';
import { RecoveryFormComponent } from '../../components/auth-forms/recovery-form/recovery-form.component';
import { ResetFormComponent } from '../../components/auth-forms/reset-form/reset-form.component';
import { SignupFormComponent } from '../../components/auth-forms/signup-form/signup-form.component';


const routes: Routes = [
  {
    path: "",
    component: AuthPage,
    children: [
      { path: "login", component: LoginFormComponent },
      { path: "signup", component: SignupFormComponent },
      { path: "recovery", component: RecoveryFormComponent },
      { path: "activate", component: ActivateFormComponent },
      { path: "reset", component: ResetFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
