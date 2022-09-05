import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomersApiService } from 'projects/restaurant/src/app/services/modules-api/customers-api/customers-api.service';

import { Customer } from 'projects/restaurant/src/app/models/modules/customers/customers.model';


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {

  constructor(
    private router: Router,
    private customersApi: CustomersApiService
  ) { }

  @ViewChild('customerFormComponentReference', { read: CustomerFormComponent, static: false }) customerForm!: CustomerFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Customer", url: "/home/customers/new-customer" },
  ];

  isCustomerSaving = false;

  ngOnInit(): void {
  }

  createCustomer(){
    console.log('u are saving a new customer');

    var data: Customer = {
      account: localStorage.getItem('restaurant_id') as string,
      customer_code: this.customerForm.customerForm.controls.customerCode.value as string,
      customer_name: this.customerForm.customerForm.controls.customerName.value as string,
      customer_type: this.customerForm.customerForm.controls.customerType.value as string,
      phone: this.customerForm.customerForm.controls.phone.value as string,
      email: this.customerForm.customerForm.controls.email.value as string,
      address: this.customerForm.customerForm.controls.address.value as string,
      state: this.customerForm.customerForm.controls.state.value as string,
      city: this.customerForm.customerForm.controls.city.value as string,
      allergies: this.customerForm.customerForm.controls.allergies.value as string,
      preferences: this.customerForm.customerForm.controls.preferences.value as string,
    }

    console.log(data);
    this.isCustomerSaving = true;

    this.customersApi.postCustomer(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isCustomerSaving = false;

          sessionStorage.setItem('restaurant_customer_id', res.id);
          this.router.navigateByUrl('/home/customers/view-customer');
        },
        error: (err) => {
          console.log(err);
          this.isCustomerSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

}
