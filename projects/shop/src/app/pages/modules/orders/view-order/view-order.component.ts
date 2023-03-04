import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { OrderItemsComponent } from '../order-items/order-items.component';
// import { SelectCustomerComponent } from '../../../../components/select-windows/customers-windows/select-customer/select-customer.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { OrdersApiService } from 'projects/shop/src/app/services/modules-api/orders-api/orders-api.service';
// import { OrdersPrintService } from 'projects/shop/src/app/services/modules-printing/orders-print/orders-print.service';

// import { Order } from 'projects/shop/src/app/models/modules/orders/orders.model';


@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private ordersApi: OrdersApiService,
    // private ordersPrint: OrdersPrintService
  ) { }

  @ViewChild('existButtonElementReference', { read: ElementRef, static: false }) existButtonElement!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('orderItemsComponentReference', { read: OrderItemsComponent, static: false }) orderItems!: OrderItemsComponent;

  // @ViewChild('selectCustomerComponentReference', { read: SelectCustomerComponent, static: false }) selectCustomer!: SelectCustomerComponent;

  navHeading: any[] = [
    { text: "All Orders", url: "/home/orders/all-orders" },
    { text: "View Order", url: "/home/orders/view-order" },
  ];

  orderFormData: any;

  selectedCustomerId = "";
  selectedCustomerName = "";
  selectedTableId = "";

  isOrderLoading: boolean = false;
  isOrderSaving: boolean = false;
  isOrderDeleting: boolean = false;

  orderForm = new FormGroup({
    orderCode: new FormControl(''),
    orderDate: new FormControl(),
    orderType: new FormControl(''),
    orderStatus: new FormControl(''),
    customerName: new FormControl(''),
  })

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(){
    this.isOrderLoading = true;

    this.ordersApi.getOrder()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.orderFormData = res;
          this.isOrderLoading = false;

          this.orderForm.controls.orderCode.setValue(this.orderFormData.order_code);
          this.orderForm.controls.orderDate.setValue(new Date(this.orderFormData.order_date).toISOString().slice(0, 16));
          this.orderForm.controls.orderType.setValue(this.orderFormData.order_type);
          this.orderForm.controls.orderStatus.setValue(this.orderFormData.order_status);

          this.selectedCustomerId = this.orderFormData.customer?.id;
          this.selectedCustomerName = this.orderFormData.customer_name;
          this.orderForm.controls.customerName.setValue(this.orderFormData.customer_name);
        },
        error: (err) => {
          console.log(err);
          this.isOrderLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putOrder(){
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
      customer_name: this.orderForm.controls.customerName.value as string,
      order_code: this.orderForm.controls.orderCode.value as string,
      order_date: this.orderForm.controls.orderDate.value,
      order_type: this.orderForm.controls.orderType.value as string,
      order_status: this.orderForm.controls.orderStatus.value as string,
      total_amount: this.orderItems.totalAmount,      
    }

    console.log(data);
    this.isOrderSaving = true;

    this.ordersApi.putOrder(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isOrderSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isOrderSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteOrder(){
    this.isOrderDeleting = true;

    this.ordersApi.deleteOrder()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.router.navigateByUrl('/home/orders/all-orders');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  openCustomerWindow(){
    console.log("You are opening select customer window")
    // this.selectCustomer.openModal();
  }

  onCustomerSelected(customerData: any){
    console.log(customerData);

    this.orderForm.controls.customerName.setValue(customerData.customer_name);
    this.selectedCustomerId = customerData.id;
  }

  onPrint(){
    console.log("lets start printing...");
    // this.ordersPrint.printViewOrder();
  }

  onPrintRoll(){
    console.log("lets start printing roll...");
    // this.ordersPrint.printOrderRoll();
  }
  
}
