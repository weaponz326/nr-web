import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { SelectCustomerComponent } from '../../../../components/select-windows/customers-windows/select-customer/select-customer.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { OrdersApiService } from 'projects/shop/src/app/services/modules-api/orders-api/orders-api.service';

// import { Order } from 'projects/shop/src/app/models/modules/orders/orders.model';


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private ordersApi: OrdersApiService,
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  // @ViewChild('selectCustomerComponentReference', { read: SelectCustomerComponent, static: false }) selectCustomer!: SelectCustomerComponent;

  selectedCustomerId = "";
  selectedCustomerName = "";
  selectedTableId = "";

  isOrderSaving = false;

  orderForm = new FormGroup({
    orderCode: new FormControl(''),
    orderDate: new FormControl(),
    customerName: new FormControl(''),
    orderType: new FormControl(''),
    tableNumber: new FormControl({value: '', disabled: true}),
  })


  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.orderForm.controls.orderDate.setValue(new Date().toISOString().slice(0, 16));
    this.getNewOrderCodeConfig();
  }

  createOrder(){
    var customerName = "";

    if(this.selectedCustomerName != ""){
      customerName = this.selectedCustomerName;
    }
    else{
      customerName = this.orderForm.controls.customerName.value as string;
    }

    // let data: Order = {
    let data = {
      account: this.customCookie.getCookie('shop_id') as string,
      customer: this.selectedCustomerId,
      customer_name: customerName,
      order_code: this.orderForm.controls.orderCode.value as string,
      order_date: this.orderForm.controls.orderDate.value as string,
      order_type: this.orderForm.controls.orderType.value as string,
      total_amount: 0,
      order_status: "",
    }

    console.log(data);
    this.isOrderSaving = true;

    // this.ordersApi.postOrder(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.id){
    //         sessionStorage.setItem('shop_order_id', res.id);

    //         if (data.order_type == "Delivery"){
    //           // this.createDelivery();
    //           // TODO: implement with django signals on backend
    //         }

    //         this.dismissButton.nativeElement.click();
    //         this.isOrderSaving = false;
    //         this.router.navigateByUrl('/home/orders/view-order');
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isOrderSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })

    console.log(data);
  }

  getNewOrderCodeConfig(){
    this.orderForm.controls.orderCode.disable();

    // this.ordersApi.getNewOrderCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.code)
    //         this.orderForm.controls.orderCode.setValue(res.code);
    //       else
    //         this.orderForm.controls.orderCode.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }
  
  openCustomerWindow(){
    console.log("You are opening select customer window")
    // this.selectCustomer.openModal();
  }

  onCustomerSelected(customerData: any){
    console.log(customerData);

    this.selectedCustomerId = customerData.id;
    this.selectedCustomerName = customerData.customer_name;
    this.orderForm.controls.customerName.setValue(customerData.customer_name);
  }

}
