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
      {
        path: "assets",
        loadChildren: () => import("./pages/modules/assets/assets.module").then(m => m.AssetsModule)
      },
      {
        path: "bills",
        loadChildren: () => import("./pages/modules/bills/bills.module").then(m => m.BillsModule)
      },
      {
        path: "bookings",
        loadChildren: () => import("./pages/modules/bookings/bookings.module").then(m => m.BookingsModule)
      },
      {
        path: "checkin",
        loadChildren: () => import("./pages/modules/checkin/checkin.module").then(m => m.CheckinModule)
      },
      {
        path: "guests",
        loadChildren: () => import("./pages/modules/guests/guests.module").then(m => m.GuestsModule)
      },
      {
        path: "housekeeping",
        loadChildren: () => import("./pages/modules/housekeeping/housekeeping.module").then(m => m.HousekeepingModule)
      },
      {
        path: "payments",
        loadChildren: () => import("./pages/modules/payments/payments.module").then(m => m.PaymentsModule)
      },
      {
        path: "rooms",
        loadChildren: () => import("./pages/modules/rooms/rooms.module").then(m => m.RoomsModule)
      },
      {
        path: "roster",
        loadChildren: () => import("./pages/modules/roster/roster.module").then(m => m.RosterModule)
      },
      {
        path: "services",
        loadChildren: () => import("./pages/modules/services/services.module").then(m => m.ServicesModule)
      },
      {
        path: "staff",
        loadChildren: () => import("./pages/modules/staff/staff.module").then(m => m.StaffModule)
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
