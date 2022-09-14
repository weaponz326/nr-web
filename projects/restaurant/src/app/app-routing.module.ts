import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'projects/personal/src/app/guards/auth/auth.guard';
import { AccountGuard } from 'projects/restaurant/src/app/guards/account/account.guard';
import { UserGuard } from './guards/landing/user/user.guard';
import { GuestGuard } from './guards/landing/guest/guest.guard';
import { AdminGuard } from 'projects/restaurant/src/app/guards/access/admin/admin.guard';
import { PortalGuard } from 'projects/restaurant/src/app/guards/access/portal/portal.guard';
import { SettingsGuard } from 'projects/restaurant/src/app/guards/access/settings/settings.guard';
import { MenuGuard } from 'projects/restaurant/src/app/guards/access/menu/menu.guard';
import { StaffGuard } from 'projects/restaurant/src/app/guards/access/staff/staff.guard';
import { TablesGuard } from 'projects/restaurant/src/app/guards/access/tables/tables.guard';
import { CustomersGuard } from 'projects/restaurant/src/app/guards/access/customers/customers.guard';
import { DeliveriesGuard } from 'projects/restaurant/src/app/guards/access/deliveries/deliveries.guard';
import { PaymentsGuard } from 'projects/restaurant/src/app/guards/access/payments/payments.guard';
import { RosterGuard } from 'projects/restaurant/src/app/guards/access/roster/roster.guard';
import { ReservationsGuard } from 'projects/restaurant/src/app/guards/access/reservations/reservations.guard';
import { OrdersGuard } from 'projects/restaurant/src/app/guards/access/orders/orders.guard';
import { KitchenStockGuard } from 'projects/restaurant/src/app/guards/access/kitchen-stock/kitchen-stock.guard';

const routes: Routes = [  
  {
    path: "",
    canActivate: [GuestGuard],
    loadChildren: () => import("./pages/guest-landing/guest-landing.module").then(m => m.GuestLandingModule)
  },
  {
    path: "guest",
    canActivate: [GuestGuard],
    loadChildren: () => import("./pages/guest-landing/guest-landing.module").then(m => m.GuestLandingModule)
  },
  {
    path: "user",
    canActivate: [UserGuard, AuthGuard],
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
    canActivate: [AccountGuard, AuthGuard],
    canActivateChild: [AccountGuard, AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () => import("./pages/module-home/module-home.module").then(m => m.ModuleHomeModule)
      },
      {
        path: "admin",
        canActivate: [AdminGuard],
        canActivateChild: [AdminGuard],
        loadChildren: () => import("./pages/modules/admin/admin.module").then(m => m.AdminModule)
      },
      {
        path: "portal",
        canActivate: [PortalGuard],
        canActivateChild: [PortalGuard],
        loadChildren: () => import("./pages/modules/portal/portal.module").then(m => m.PortalModule)
      },
      {
        path: "settings",
        canActivate: [SettingsGuard],
        canActivateChild: [SettingsGuard],
        loadChildren: () => import("./pages/modules/settings/settings.module").then(m => m.SettingsModule)
      },
      {
        path: "menu",
        canActivate: [MenuGuard],
        canActivateChild: [MenuGuard],
        loadChildren: () => import("./pages/modules/menu/menu.module").then(m => m.MenuModule)
      },
      {
        path: "staff",
        canActivate: [StaffGuard],
        canActivateChild: [StaffGuard],
        loadChildren: () => import("./pages/modules/staff/staff.module").then(m => m.StaffModule)
      },
      {
        path: "tables",
        canActivate: [TablesGuard],
        canActivateChild: [TablesGuard],
        loadChildren: () => import("./pages/modules/tables/tables.module").then(m => m.TablesModule)
      },
      {
        path: "customers",
        canActivate: [CustomersGuard],
        canActivateChild: [CustomersGuard],
        loadChildren: () => import("./pages/modules/customers/customers.module").then(m => m.CustomersModule)
      },
      {
        path: "deliveries",
        canActivate: [DeliveriesGuard],
        canActivateChild: [DeliveriesGuard],
        loadChildren: () => import("./pages/modules/deliveries/deliveries.module").then(m => m.DeliveriesModule)
      },
      {
        path: "payments",
        canActivate: [PaymentsGuard],
        canActivateChild: [PaymentsGuard],
        loadChildren: () => import("./pages/modules/payments/payments.module").then(m => m.PaymentsModule)
      },
      {
        path: "roster",
        canActivate: [RosterGuard],
        canActivateChild: [RosterGuard],
        loadChildren: () => import("./pages/modules/roster/roster.module").then(m => m.RosterModule)
      },
      {
        path: "reservations",
        canActivate: [ReservationsGuard],
        canActivateChild: [ReservationsGuard],
        loadChildren: () => import("./pages/modules/reservations/reservations.module").then(m => m.ReservationsModule)
      },
      {
        path: "orders",
        canActivate: [OrdersGuard],
        canActivateChild: [OrdersGuard],
        loadChildren: () => import("./pages/modules/orders/orders.module").then(m => m.OrdersModule)
      },
      {
        path: "kitchen-stock",
        canActivate: [KitchenStockGuard],
        canActivateChild: [KitchenStockGuard],
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
