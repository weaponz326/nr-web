import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./pages/main-landing/main-landing.module").then(m => m.MainLandingModule)
  },
  {
    path: "terms",
    loadChildren: () => import("./pages/legalities/legalities.module").then(m => m.LegalitiesModule)
  },
  {
    path: "help",
    loadChildren: () => import("./pages/help-info/help-info.module").then(m => m.HelpInfoModule)
  },
  {
    path: "auth",
    loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "user-settings",
    loadChildren: () => import("./pages/user-settings/user-settings.module").then(m => m.UserSettingsModule)
  },
  {
    path: "guest",
    loadChildren: () => import("./pages/guest-landing/guest-landing.module").then(m => m.GuestLandingModule)
  },
  {
    path: "home",
    children: [
      {
        path: "",
        loadChildren: () => import("./pages/module-home/module-home.module").then(m => m.ModuleHomeModule)
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
        path: "calendar",
        loadChildren: () => import("./pages/modules/calendar/calendar.module").then(m => m.CalendarModule)
      },
      {
        path: "budget",
        loadChildren: () => import("./pages/modules/budget/budget.module").then(m => m.BudgetModule)
      },
      {
        path: "notes",
        loadChildren: () => import("./pages/modules/notes/notes.module").then(m => m.NotesModule)
      },
      {
        path: "accounts",
        loadChildren: () => import("./pages/modules/accounts/accounts.module").then(m => m.AccountsModule)
      },
      {
        path: "tasks",
        loadChildren: () => import("./pages/modules/tasks/tasks.module").then(m => m.TasksModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
