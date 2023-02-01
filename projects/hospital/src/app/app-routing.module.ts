import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'projects/personal/src/app/guards/auth/auth.guard';
import { AccountGuard } from 'projects/restaurant/src/app/guards/account/account.guard';
// import { UserGuard } from './guards/landing/user/user.guard';
// import { GuestGuard } from './guards/landing/guest/guest.guard';
// import { ConfigAccessGuard } from './guards/access/config-access/config-access.guard';

const routes: Routes = [  
  {
    path: "",
    // canActivate: [GuestGuard],
    loadChildren: () => import("./pages/guest-landing/guest-landing.module").then(m => m.GuestLandingModule)
  },
  {
    path: "guest",
    // canActivate: [GuestGuard],
    loadChildren: () => import("./pages/guest-landing/guest-landing.module").then(m => m.GuestLandingModule)
  },
  {
    path: "user",
    // canActivate: [UserGuard, AuthGuard],
    loadChildren: () => import("./pages/user-landing/user-landing.module").then(m => m.UserLandingModule)
  },
  {
    path: "auth",
    loadChildren: () => import("projects/personal/src/app/pages/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "register",
    // canActivate: [AuthGuard],
    loadChildren: () => import("./pages/register/register.module").then(m => m.RegisterModule)
  },
  {
    path: "home",
    // canActivate: [AccountGuard, AuthGuard],
    // canActivateChild: [AccountGuard, AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () => import("./pages/module-home/module-home.module").then(m => m.ModuleHomeModule)
      },
      {
        path: "admin",
        // canActivate: [AdminGuard, ConfigAccessGuard],
        // canActivateChild: [AdminGuard, ConfigAccessGuard],
        loadChildren: () => import("./pages/modules/admin/admin.module").then(m => m.AdminModule)
      },
      {
        path: "portal",
        // canActivate: [PortalGuard, ConfigAccessGuard],
        // canActivateChild: [PortalGuard, ConfigAccessGuard],
        loadChildren: () => import("./pages/modules/portal/portal.module").then(m => m.PortalModule)
      },
      {
        path: "settings",
        // canActivate: [SettingsGuard, ConfigAccessGuard],
        // canActivateChild: [SettingsGuard, ConfigAccessGuard],
        loadChildren: () => import("./pages/modules/settings/settings.module").then(m => m.SettingsModule)
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
