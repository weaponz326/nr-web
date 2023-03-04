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
        path: "cashflow",
        loadChildren: () => import("./pages/modules/cashflow/cashflow.module").then(m => m.CashflowModule)
      },
      {
        path: "customers",
        loadChildren: () => import("./pages/modules/customers/customers.module").then(m => m.CustomersModule)
      },
      {
        path: "inventory",
        loadChildren: () => import("./pages/modules/inventory/inventory.module").then(m => m.InventoryModule)
      },
      {
        path: "invoice",
        loadChildren: () => import("./pages/modules/invoice/invoice.module").then(m => m.InvoiceModule)
      },
      {
        path: "marketting",
        loadChildren: () => import("./pages/modules/marketting/marketting.module").then(m => m.MarkettingModule)
      },
      {
        path: "orders",
        loadChildren: () => import("./pages/modules/orders/orders.module").then(m => m.OrdersModule)
      },
      {
        path: "payables",
        loadChildren: () => import("./pages/modules/payables/payables.module").then(m => m.PayablesModule)
      },
      {
        path: "payments",
        loadChildren: () => import("./pages/modules/payments/payments.module").then(m => m.PaymentsModule)
      },
      {
        path: "products",
        loadChildren: () => import("./pages/modules/products/products.module").then(m => m.ProductsModule)
      },
      {
        path: "purchasing",
        loadChildren: () => import("./pages/modules/purchasing/purchasing.module").then(m => m.PurchasingModule)
      },
      {
        path: "receivables",
        loadChildren: () => import("./pages/modules/receivables/receivables.module").then(m => m.ReceivablesModule)
      },
      {
        path: "sales",
        loadChildren: () => import("./pages/modules/sales/sales.module").then(m => m.SalesModule)
      },
      {
        path: "staff",
        loadChildren: () => import("./pages/modules/staff/staff.module").then(m => m.StaffModule)
      },
      {
        path: "suppliers",
        loadChildren: () => import("./pages/modules/suppliers/suppliers.module").then(m => m.SuppliersModule)
      },      
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
