import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { AdminApiService } from 'projects/restaurant/src/app/services/modules-api/admin-api/admin-api.service';

import { UserAccess } from 'projects/restaurant/src/app/models/modules/admin/admin.model';


@Component({
  selector: 'app-access-form',
  templateUrl: './access-form.component.html',
  styleUrls: ['./access-form.component.scss']
})
export class AccessFormComponent implements OnInit {

  constructor(
    private adminApi: AdminApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  accessForm: UserAccess = {
    account: localStorage.getItem('restaurant_id') as string,
    admin_access: false,
    customers_access: false,
    deliveries_access: false,
    kitchen_stock_access: false,
    menu_access: false,
    orders_access: false,
    payments_access: false,
    portal_access:  false,
    roster_access:  false,
    settings_access: false,
    staff_access: false,
    reservations_access: false,
    tables_access: false,
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
          this.accessForm.customers_access = res.customers_access;
          this.accessForm.deliveries_access = res.deliveries_access;
          this.accessForm.kitchen_stock_access = res.kitchen_stock_access;
          this.accessForm.menu_access = res.menu_access;
          this.accessForm.orders_access = res.orders_access;
          this.accessForm.payments_access = res.payments_access;
          this.accessForm.portal_access = res.portal_access;
          this.accessForm.roster_access = res.roster_access;
          this.accessForm.reservations_access = res.reservations_access;
          this.accessForm.settings_access = res.settings_access;
          this.accessForm.staff_access = res.staff_access;
          this.accessForm.tables_access = res.tables_access;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  updateUserAccess(){
    let access: UserAccess = {
      account: localStorage.getItem('restaurant_id') as string,
      admin_access: this.accessForm.admin_access,
      customers_access: this.accessForm.customers_access,
      deliveries_access: this.accessForm.deliveries_access,
      kitchen_stock_access: this.accessForm.kitchen_stock_access,
      menu_access: this.accessForm.menu_access,
      orders_access: this.accessForm.orders_access,
      payments_access: this.accessForm.payments_access,
      portal_access: this.accessForm.portal_access,
      roster_access: this.accessForm.roster_access,
      settings_access: this.accessForm.settings_access,
      staff_access: this.accessForm.staff_access,
      reservations_access: this.accessForm.reservations_access,
      tables_access: this.accessForm.tables_access
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

    if (level == 'Admin'){
      this.accessForm.admin_access = true;
      this.accessForm.customers_access = true;
      this.accessForm.deliveries_access = true;
      this.accessForm.kitchen_stock_access = true;
      this.accessForm.menu_access = true;
      this.accessForm.orders_access = true;
      this.accessForm.payments_access = true;
      this.accessForm.portal_access = true;
      this.accessForm.reservations_access = true;
      this.accessForm.roster_access = true;
      this.accessForm.settings_access = true;
      this.accessForm.staff_access = true;
      this.accessForm.tables_access = true;
    }
    else if (level == 'Manager'){
      this.accessForm.admin_access =  false;
      this.accessForm.customers_access = true;
      this.accessForm.deliveries_access = true;
      this.accessForm.kitchen_stock_access = true;
      this.accessForm.menu_access = true;
      this.accessForm.orders_access = true;
      this.accessForm.payments_access = true;
      this.accessForm.portal_access = false;
      this.accessForm.reservations_access = true;
      this.accessForm.roster_access = true;
      this.accessForm.settings_access = false;
      this.accessForm.staff_access = true;
      this.accessForm.tables_access = true;
    }
    else if (level == 'Staff'){
      this.accessForm.admin_access = false;
      this.accessForm.customers_access = false;
      this.accessForm.deliveries_access = false;
      this.accessForm.kitchen_stock_access = false;
      this.accessForm.menu_access = false;
      this.accessForm.orders_access = false;
      this.accessForm.payments_access = false;
      this.accessForm.portal_access = false;
      this.accessForm.reservations_access = false;
      this.accessForm.roster_access = false;
      this.accessForm.settings_access = false;
      this.accessForm.staff_access = false;
      this.accessForm.tables_access = false;
    }
  }

}
