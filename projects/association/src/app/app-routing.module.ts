import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'projects/personal/src/app/guards/auth/auth.guard';
// import { AccountGuard } from 'projects/association/src/app/guards/account/account.guard';
// import { UserGuard } from './guards/landing/user/user.guard';
// import { GuestGuard } from './guards/landing/guest/guest.guard';
// import { ConfigAccessGuard } from './guards/access/config-access/config-access.guard';

// import { AdminGuard } from 'projects/association/src/app/guards/access/modules-access/admin/admin.guard';
// import { PortalGuard } from 'projects/association/src/app/guards/access/modules-access/portal/portal.guard';
// import { SettingsGuard } from 'projects/association/src/app/guards/access/modules-access/settings/settings.guard';

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
    canActivate: [AuthGuard],
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
      {
        path: "accounts",
        loadChildren: () => import("./pages/modules/accounts/accounts.module").then(m => m.AccountsModule)
      },
      {
        path: "members",
        loadChildren: () => import("./pages/modules/members/members.module").then(m => m.MembersModule)
      },
      // {
      //   path: "committees",
      //   loadChildren: () => import("./pages/modules/committees/committees.module").then(m => m.)
      // },
      {
        path: "dues",
        loadChildren: () => import("./pages/modules/dues/dues.module").then(m => m.DuesModule)
      },
      {
        path: "executives",
        loadChildren: () => import("./pages/modules/executives/executives.module").then(m => m.ExecutivesModule)
      },
      {
        path: "action-plan",
        loadChildren: () => import("./pages/modules/action-plan/action-plan.module").then(m => m.ActionPlanModule)
      },
      {
        path: "attendance",
        loadChildren: () => import("./pages/modules/attendance/attendance.module").then(m => m.AttendanceModule)
      },
      {
        path: "meetings",
        loadChildren: () => import("./pages/modules/meetings/meetings.module").then(m => m.MeetingsModule)
      },
      {
        path: "groups",
        loadChildren: () => import("./pages/modules/groups/groups.module").then(m => m.GroupsModule)
      },
      {
        path: "fiscal-year",
        loadChildren: () => import("./pages/modules/fiscal-year/fiscal-year.module").then(m => m.FiscalYearModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
