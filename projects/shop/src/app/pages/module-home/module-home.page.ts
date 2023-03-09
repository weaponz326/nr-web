import { Component, OnInit, ViewChild } from '@angular/core';

import { AccessToastComponent } from 'projects/personal/src/app/components/module-utilities/access-toast/access-toast.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { AdminApiService } from '../../services/modules-api/admin-api/admin-api.service';


@Component({
  selector: 'app-module-home',
  templateUrl: './module-home.page.html',
  styleUrls: ['./module-home.page.scss']
})
export class ModuleHomePage implements OnInit {

  constructor(
    private adminApi: AdminApiService
  ) { }

  @ViewChild('accessToastComponentReference', { read: AccessToastComponent, static: false }) accessToast!: AccessToastComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  access: any;
  level: any;

  isAccessLoading = false;

  ngOnInit(): void {
    this.getAccountUserLevel();
    this.getAccessAccess();
  }

  getAccountUserLevel() {
    this.adminApi.getAccountUserLevel()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.level = res;
          localStorage.setItem("shopUserAccess", JSON.stringify(res));
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getAccessAccess() {
    this.isAccessLoading = true;

    this.adminApi.getAccessAccess()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.access = res;
          localStorage.setItem("shopUserAccess", JSON.stringify(res));

          this.isAccessLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isAccessLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  checkAccess(module: string){
    console.log(this.access);

    if (module == "admin" && (!this.access.admin_access || this.level.access_level == "Staff"))
      this.accessToast.openToast();
    else if (module == "portal" && (!this.access.portal_access || this.level.access_level == "Staff"))
      this.accessToast.openToast();
    else if (module == "settings" && (!this.access.settings_access || this.level.access_level == "Staff"))
      this.accessToast.openToast();
    else if (module == "receivables" && !this.access.receivables_access)
      this.accessToast.openToast();
    else if (module == "products" && !this.access.products_access)
      this.accessToast.openToast();
    else if (module == "invoice" && !this.access.invoice_access)
      this.accessToast.openToast();
    else if (module == "marketting" && !this.access.marketting_access)
      this.accessToast.openToast();
    else if (module == "payables" && !this.access.payables_access)
      this.accessToast.openToast();
    else if (module == "sales" && !this.access.sales_access)
      this.accessToast.openToast();
    else if (module == "customers" && !this.access.customers_access)
      this.accessToast.openToast();
    else if (module == "payments" && !this.access.payments_access)
      this.accessToast.openToast();
    else if (module == "orders" && !this.access.orders_access)
      this.accessToast.openToast();
    else if (module == "inventory" && !this.access.inventory_access)
      this.accessToast.openToast();
    else if (module == "suppliers" && !this.access.suppliers_access)
      this.accessToast.openToast();
    else if (module == "purchasing" && !this.access.purchasing_access)
      this.accessToast.openToast();
    else if (module == "cashflow" && !this.access.cashflow_access)
      this.accessToast.openToast();
    else if (module == "staff" && !this.access.staff_access)
      this.accessToast.openToast();      
    else
      console.log("Access granted :)");
  }

}
