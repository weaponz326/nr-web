import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        path: "menu",
        loadChildren: () => import("./pages/modules/menu/menu.module").then(m => m.MenuModule)
      },
      {
        path: "staff",
        loadChildren: () => import("./pages/modules/staff/staff.module").then(m => m.StaffModule)
      },
      {
        path: "tables",
        loadChildren: () => import("./pages/modules/tables/tables.module").then(m => m.TablesModule)
      },
      {
        path: "customers",
        loadChildren: () => import("./pages/modules/customers/customers.module").then(m => m.CustomersModule)
      },
      {
        path: "deliveries",
        loadChildren: () => import("./pages/modules/deliveries/deliveries.module").then(m => m.DeliveriesModule)
      },
      {
        path: "payments",
        loadChildren: () => import("./pages/modules/payments/payments.module").then(m => m.PaymentsModule)
      },
      {
        path: "roster",
        loadChildren: () => import("./pages/modules/roster/roster.module").then(m => m.RosterModule)
      },
      {
        path: "reservations",
        loadChildren: () => import("./pages/modules/reservations/reservations.module").then(m => m.ReservationsModule)
      },
      {
        path: "orders",
        loadChildren: () => import("./pages/modules/orders/orders.module").then(m => m.OrdersModule)
      },
      {
        path: "kitchen-stock",
        loadChildren: () => import("./pages/modules/kitchen-stock/kitchen-stock.module").then(m => m.KitchenStockModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
