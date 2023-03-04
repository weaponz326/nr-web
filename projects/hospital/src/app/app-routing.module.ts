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
        path: "patients",
        loadChildren: () => import("./pages/modules/patients/patients.module").then(m => m.PatientsModule)
      },
      
      {
        path: "appointments",
        loadChildren: () => import("./pages/modules/appointments/appointments.module").then(m => m.AppointmentsModule)
      },
      {
        path: "staff",
        loadChildren: () => import("./pages/modules/staff/staff.module").then(m => m.StaffModule)
      },
      {
        path: "bills",
        loadChildren: () => import("./pages/modules/bills/bills.module").then(m => m.BillsModule)
      },
      {
        path: "doctors",
        loadChildren: () => import("./pages/modules/doctors/doctors.module").then(m => m.DoctorsModule)
      },
      {
        path: "laboratory",
        loadChildren: () => import("./pages/modules/laboratory/laboratory.module").then(m => m.LaboratoryModule)
      },
      {
        path: "payments",
        loadChildren: () => import("./pages/modules/payments/payments.module").then(m => m.PaymentsModule)
      },
      {
        path: "nurses",
        loadChildren: () => import("./pages/modules/nurses/nurses.module").then(m => m.NursesModule)
      },
      {
        path: "prescriptions",
        loadChildren: () => import("./pages/modules/prescriptions/prescriptions.module").then(m => m.PrescriptionsModule)
      },
      {
        path: "diagnosis",
        loadChildren: () => import("./pages/modules/diagnosis/diagnosis.module").then(m => m.DiagnosisModule)
      },
      {
        path: "drugs",
        loadChildren: () => import("./pages/modules/drugs/drugs.module").then(m => m.DrugsModule)
      },
      {
        path: "wards",
        loadChildren: () => import("./pages/modules/wards/wards.module").then(m => m.WardsModule)
      },
      {
        path: "admissions",
        loadChildren: () => import("./pages/modules/admissions/admissions.module").then(m => m.AdmissionsModule)
      },
      {
        path: "dispensary",
        loadChildren: () => import("./pages/modules/dispensary/dispensary.module").then(m => m.DispensaryModule)
      },
      {
        path: "roster",
        loadChildren: () => import("./pages/modules/roster/roster.module").then(m => m.RosterModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
