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
      {
        path: "parents",
        loadChildren: () => import("./pages/modules/parents/parents.module").then(m => m.ParentsModule)
      },
      {
        path: "assessment",
        loadChildren: () => import("./pages/modules/assessment/assessment.module").then(m => m.AssessmentModule)
      },
      {
        path: "subjects",
        loadChildren: () => import("./pages/modules/subjects/subjects.module").then(m => m.SubjectsModule)
      },
      {
        path: "attendance",
        loadChildren: () => import("./pages/modules/attendance/attendance.module").then(m => m.AttendanceModule)
      },
      {
        path: "students",
        loadChildren: () => import("./pages/modules/students/students.module").then(m => m.StudentsModule)
      },
      {
        path: "lesson-plan",
        loadChildren: () => import("./pages/modules/lesson-plan/lesson-plan.module").then(m => m.LessonPlanModule)
      },
      {
        path: "reports",
        loadChildren: () => import("./pages/modules/reports/reports.module").then(m => m.ReportsModule)
      },
      {
        path: "teachers",
        loadChildren: () => import("./pages/modules/teachers/teachers.module").then(m => m.TeachersModule)
      },
      {
        path: "payments",
        loadChildren: () => import("./pages/modules/payments/payments.module").then(m => m.PaymentsModule)
      },
      {
        path: "terms",
        loadChildren: () => import("./pages/modules/terms/terms.module").then(m => m.TermsModule)
      },
      {
        path: "classes",
        loadChildren: () => import("./pages/modules/classes/classes.module").then(m => m.ClassesModule)
      },
      {
        path: "timetable",
        loadChildren: () => import("./pages/modules/timetable/timetable.module").then(m => m.TimetableModule)
      },
      {
        path: "fees",
        loadChildren: () => import("./pages/modules/fees/fees.module").then(m => m.FeesModule)
      },
      {
        path: "sections",
        loadChildren: () => import("./pages/modules/sections/sections.module").then(m => m.SectionsModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
