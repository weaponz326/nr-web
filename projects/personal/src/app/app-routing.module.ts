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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
