import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { CustomersApiService } from 'projects/shop/src/app/services/modules-api/customers-api/customers-api.service';
// import { CustomersPrintService } from 'projects/shop/src/app/services/modules-printing/customers-print/customers-print.service';

// import { Customer } from 'projects/shop/src/app/models/modules/customers/customers.model';


@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private customersApi: CustomersApiService,
    // private customersPrint: CustomersPrintService,
  ) { }

  @ViewChild('customerFormComponentReference', { read: CustomerFormComponent, static: false }) customerForm!: CustomerFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Customers", url: "/home/customers/all-customers" },
    { text: "View Customer", url: "/home/customers/view-customer" },
  ];

  customerData: any;

  isCustomerLoading = false;
  isCustomerSaving = false;
  isCustomerDeleting = false;

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer(){
    this.isCustomerLoading = true;

    // this.customersApi.getCustomer()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.customerData = res;
    //       this.isCustomerLoading = false;

    //       this.customerForm.customerForm.controls.customerCode.setValue(this.customerData.customer_code);
    //       this.customerForm.customerForm.controls.customerName.setValue(this.customerData.customer_name);
    //       this.customerForm.customerForm.controls.customerType.setValue(this.customerData.customer_type);
    //       this.customerForm.customerForm.controls.phone.setValue(this.customerData.phone);
    //       this.customerForm.customerForm.controls.email.setValue(this.customerData.email);
    //       this.customerForm.customerForm.controls.address.setValue(this.customerData.address);
    //       this.customerForm.customerForm.controls.state.setValue(this.customerData.state);
    //       this.customerForm.customerForm.controls.city.setValue(this.customerData.city);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isCustomerLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putCustomer(){
    console.log('u are saving a new customer');

    // let data: Customer = {
    let data = {
      account: this.customCookie.getCookie('shop_id') as string,
      customer_code: this.customerForm.customerForm.controls.customerCode.value as string,
      customer_name: this.customerForm.customerForm.controls.customerName.value as string,
      customer_type: this.customerForm.customerForm.controls.customerType.value as string,
      phone: this.customerForm.customerForm.controls.phone.value as string,
      email: this.customerForm.customerForm.controls.email.value as string,
      address: this.customerForm.customerForm.controls.address.value as string,
      state: this.customerForm.customerForm.controls.state.value as string,
      city: this.customerForm.customerForm.controls.city.value as string,
    }

    console.log(data);
    this.isCustomerSaving = true;

    // this.customersApi.putCustomer(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isCustomerSaving = false;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isCustomerSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteCustomer(){
    this.isCustomerDeleting = true;

    // this.customersApi.deleteCustomer()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/customers/all-customers');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.customersPrint.printViewCustomer();
  }

}
