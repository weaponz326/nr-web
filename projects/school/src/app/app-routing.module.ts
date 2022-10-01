import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'projects/personal/src/app/guards/auth/auth.guard';
import { AccountGuard } from 'projects/school/src/app/guards/account/account.guard';
import { UserGuard } from './guards/landing/user/user.guard';
import { GuestGuard } from './guards/landing/guest/guest.guard';
import { AdminGuard } from 'projects/school/src/app/guards/access/admin/admin.guard';
import { PortalGuard } from 'projects/school/src/app/guards/access/portal/portal.guard';
import { SettingsGuard } from 'projects/school/src/app/guards/access/settings/settings.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./pages/guest-landing/guest-landing.module").then(m => m.GuestLandingModule)
  },
  {
    path: "guest",
    loadChildren: () => import("./pages/guest-landing/guest-landing.module").then(m => m.GuestLandingModule)
  },
  {
    path: "user",
    loadChildren: () => import("./pages/user-landing/user-landing.module").then(m => m.UserLandingModule)
  },
  {
    path: "auth",
    loadChildren: () => import("projects/personal/src/app/pages/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "register",
    loadChildren: () => import("./pages/register/register.module").then(m => m.RegisterModule)
  },
  {
    path: "home",
    children: [
      {
        path: "",
        loadChildren: () => import("./pages/module-home/module-home.module").then(m => m.ModuleHomeModule)
      },
      {
        path: "admin",
        loadChildren: () => import("./pages/modules/admin/admin.module").then(m => m.AdminModule)
      },
      {
        path: "portal",
        loadChildren: () => import("./pages/modules/portal/portal.module").then(m => m.PortalModule)
      },
      {
        path: "settings",
        loadChildren: () => import("./pages/modules/settings/settings.module").then(m => m.SettingsModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
