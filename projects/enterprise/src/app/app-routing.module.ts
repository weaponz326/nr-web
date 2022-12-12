import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'projects/personal/src/app/guards/auth/auth.guard';
import { AccountGuard } from 'projects/restaurant/src/app/guards/account/account.guard';
import { UserGuard } from './guards/landing/user/user.guard';
import { GuestGuard } from './guards/landing/guest/guest.guard';
import { ConfigAccessGuard } from './guards/access/config-access/config-access.guard';

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
        path: "accounts",
        loadChildren: () => import("./pages/modules/accounts/accounts.module").then(m => m.AccountsModule)
      },
      {
        path: "payroll",
        loadChildren: () => import("./pages/modules/payroll/payroll.module").then(m => m.PayrollModule)
      },
      {
        path: "attendance",
        loadChildren: () => import("./pages/modules/attendance/attendance.module").then(m => m.AttendanceModule)
      },
      {
        path: "assets",
        loadChildren: () => import("./pages/modules/assets/assets.module").then(m => m.AssetsModule)
      },
      {
        path: "leave",
        loadChildren: () => import("./pages/modules/leave/leave.module").then(m => m.LeaveModule)
      },
      {
        path: "budget",
        loadChildren: () => import("./pages/modules/budget/budget.module").then(m => m.BudgetModule)
      },
      {
        path: "procurement",
        loadChildren: () => import("./pages/modules/procurement/procurement.module").then(m => m.ProcurementModule)
      },
      {
        path: "letters",
        loadChildren: () => import("./pages/modules/letters/letters.module").then(m => m.LettersModule)
      },
      {
        path: "appraisal",
        loadChildren: () => import("./pages/modules/appraisal/appraisal.module").then(m => m.AppraisalModule)
      },
      {
        path: "files",
        loadChildren: () => import("./pages/modules/files/files.module").then(m => m.FilesModule)
      },
      {
        path: "employees",
        loadChildren: () => import("./pages/modules/employees/employees.module").then(m => m.EmployeesModule)
      },
      {
        path: "ledger",
        loadChildren: () => import("./pages/modules/ledger/ledger.module").then(m => m.LedgerModule)
      },
      {
        path: "reception",
        loadChildren: () => import("./pages/modules/reception/reception.module").then(m => m.ReceptionModule)
      },
      {
        path: "fiscal-year",
        loadChildren: () => import("./pages/modules/fiscal-year/fiscal-year.module").then(m => m.FiscalYearModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
