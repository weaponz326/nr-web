import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AdminApiService } from 'projects/shop/src/app/services/modules-api/admin-api/admin-api.service';

import { UserAccess } from 'projects/shop/src/app/models/modules/admin/admin.model';


@Component({
  selector: 'app-access-form',
  templateUrl: './access-form.component.html',
  styleUrls: ['./access-form.component.scss']
})
export class AccessFormComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private adminApi: AdminApiService,
  ) { }

  @Input() isCreator = false;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  accessForm: UserAccess = {
    account: this.customCookie.getCookie('shop_id') as string,
    admin_access: false,
    cashflow_access: false,
    customers_access: false,
    inventory_access: false,
    invoice_access: false,
    marketting_access: false,
    orders_access: false,
    payables_access: false,
    payments_access: false,
    portal_access: false,
    products_access: false,
    purchasing_access: false,
    receivables_access: false,
    sales_access: false,
    settings_access: false,
    staff_access: false,
    suppliers_access: false,
  }

  ngOnInit(): void {
    this.getUserAccess();
  }

  getUserAccess(){
    this.adminApi.getUserAccess()
    .subscribe({
        next: (res) => {
          console.log(res);
          
          this.accessForm.admin_access = res.admin_access;
          this.accessForm.cashflow_access = res.cashflow_access;
          this.accessForm.customers_access = res.customers_access;
          this.accessForm.inventory_access = res.inventory_access;
          this.accessForm.invoice_access = res.invoice_access;
          this.accessForm.marketting_access = res.marketting_access;
          this.accessForm.orders_access = res.orders_access;
          this.accessForm.payables_access = res.payables_access;
          this.accessForm.payments_access = res.payments_access;
          this.accessForm.portal_access = res.portal_access;
          this.accessForm.products_access = res.products_access;
          this.accessForm.purchasing_access = res.purchasing_access;
          this.accessForm.receivables_access = res.receivables_access;
          this.accessForm.sales_access = res.sales_access;
          this.accessForm.settings_access = res.settings_access;
          this.accessForm.staff_access = res.staff_access;
          this.accessForm.suppliers_access = res.suppliers_access;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  updateUserAccess(){
    let access: UserAccess = {
      account: this.customCookie.getCookie('shop_id') as string,      
      admin_access: this.accessForm.admin_access,
      cashflow_access: this.accessForm.cashflow_access,
      customers_access: this.accessForm.customers_access,
      inventory_access: this.accessForm.inventory_access,
      invoice_access: this.accessForm.invoice_access,
      marketting_access: this.accessForm.marketting_access,
      orders_access: this.accessForm.orders_access,
      payables_access: this.accessForm.payables_access,
      payments_access: this.accessForm.payments_access,
      portal_access: this.accessForm.portal_access,
      products_access: this.accessForm.products_access,
      purchasing_access: this.accessForm.purchasing_access,
      receivables_access: this.accessForm.receivables_access,
      sales_access: this.accessForm.sales_access,
      settings_access: this.accessForm.settings_access,
      staff_access: this.accessForm.staff_access,
      suppliers_access: this.accessForm.suppliers_access,
    }

    this.adminApi.putUserAccess(access)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  setLevelAccess(level: string) {
    console.log("u are changing user level to " + level);
    
    if (level == 'Admin') {
      this.accessForm.admin_access = true;
      this.accessForm.cashflow_access = true;
      this.accessForm.customers_access = true;
      this.accessForm.inventory_access = true;
      this.accessForm.invoice_access = true;
      this.accessForm.marketting_access = true;
      this.accessForm.orders_access = true;
      this.accessForm.payables_access = true;
      this.accessForm.payments_access = true;
      this.accessForm.portal_access = true;
      this.accessForm.products_access = true;
      this.accessForm.purchasing_access = true;
      this.accessForm.receivables_access = true;
      this.accessForm.sales_access = true;
      this.accessForm.settings_access = true;
      this.accessForm.staff_access = true;
      this.accessForm.suppliers_access = true;
    }
    else if (level == 'Manager') {
      this.accessForm.admin_access = false;
      this.accessForm.cashflow_access = true;
      this.accessForm.customers_access = true;
      this.accessForm.inventory_access = true;
      this.accessForm.invoice_access = true;
      this.accessForm.marketting_access = true;
      this.accessForm.orders_access = true;
      this.accessForm.payables_access = true;
      this.accessForm.payments_access = true;
      this.accessForm.portal_access = false;
      this.accessForm.products_access = true;
      this.accessForm.purchasing_access = true;
      this.accessForm.receivables_access = true;
      this.accessForm.sales_access = true;
      this.accessForm.settings_access = false;
      this.accessForm.staff_access = true;
      this.accessForm.suppliers_access = true;
    }
    else if (level == 'Staff') {
      this.accessForm.admin_access = false;
      this.accessForm.cashflow_access = false;
      this.accessForm.customers_access = false;
      this.accessForm.inventory_access = false;
      this.accessForm.invoice_access = false;
      this.accessForm.marketting_access = false;
      this.accessForm.orders_access = false;
      this.accessForm.payables_access = false;
      this.accessForm.payments_access = false;
      this.accessForm.portal_access = false;
      this.accessForm.products_access = false;
      this.accessForm.purchasing_access = false;
      this.accessForm.receivables_access = false;
      this.accessForm.sales_access = false;
      this.accessForm.settings_access = false;
      this.accessForm.staff_access = false;
      this.accessForm.suppliers_access = false;
    }
  }

}
