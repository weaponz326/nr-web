import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from '../../components/auth-forms/login-form/login-form.component';
import { RecoveryFormComponent } from '../../components/auth-forms/recovery-form/recovery-form.component';
import { SignupFormComponent } from '../../components/auth-forms/signup-form/signup-form.component';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: "",
    component: AuthPage,
    children: [
      { path: "login", component: LoginFormComponent },
      { path: "signup", component: SignupFormComponent },
      { path: "recovery", component: RecoveryFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
