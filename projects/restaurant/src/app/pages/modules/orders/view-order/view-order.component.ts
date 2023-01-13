import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { OrderItemsComponent } from '../order-items/order-items.component';
import { SelectCustomerComponent } from '../../../../components/select-windows/customers-windows/select-customer/select-customer.component';
import { SelectTableComponent } from '../../../../components/select-windows/tables-windows/select-table/select-table.component';
import { SelectMenuItemComponent } from '../../../../components/select-windows/menu-windows/select-menu-item/select-menu-item.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { OrdersApiService } from 'projects/restaurant/src/app/services/modules-api/orders-api/orders-api.service';
import { DeliveriesApiService } from 'projects/restaurant/src/app/services/modules-api/deliveries-api/deliveries-api.service';
import { OrdersPrintService } from 'projects/restaurant/src/app/services/modules-printing/orders-print/orders-print.service';

import { Order } from 'projects/restaurant/src/app/models/modules/orders/orders.model';
import { Delivery } from 'projects/restaurant/src/app/models/modules/deliveries/deliveries.model';


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
    private deliveriesApi: DeliveriesApiService,
    private ordersPrint: OrdersPrintService
  ) { }

  @ViewChild('existButtonElementReference', { read: ElementRef, static: false }) existButtonElement!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('orderItemsComponentReference', { read: OrderItemsComponent, static: false }) orderItems!: OrderItemsComponent;

  @ViewChild('selectCustomerComponentReference', { read: SelectCustomerComponent, static: false }) selectCustomer!: SelectCustomerComponent;
  @ViewChild('selectTableComponentReference', { read: SelectTableComponent, static: false }) selectTable!: SelectTableComponent;
  @ViewChild('selectMenuItemComponentReference', { read: SelectMenuItemComponent, static: false }) selectMenuItem!: SelectMenuItemComponent;

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
  isCheckingDelivery: boolean = false;

  orderForm = new FormGroup({
    orderCode: new FormControl(''),
    orderDate: new FormControl(),
    orderType: new FormControl(''),
    orderStatus: new FormControl(''),
    customerName: new FormControl(''),
    tableNumber: new FormControl({value: '', disabled: true}),
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
          this.selectedTableId = this.orderFormData.table?.id;
          this.orderForm.controls.tableNumber.setValue(this.orderFormData.table?.table_number);
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

    let data: Order = {
      account: this.customCookie.getCookie('restaurant_id') as string,
      table: this.selectedTableId,
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
    this.selectCustomer.openModal();
  }

  onCustomerSelected(customerData: any){
    console.log(customerData);

    this.orderForm.controls.customerName.setValue(customerData.customer_name);
    this.selectedCustomerId = customerData.id;
  }

  openTableWindow(){
    console.log("You are opening select table window")
    this.selectTable.openModal();
  }
  
  onTableSelected(tableData: any){
    console.log(tableData);

    this.orderForm.controls.tableNumber.setValue(tableData.table_number);
    this.selectedTableId = tableData.id;
  }

  gotoDelivery(deliveryId: any){
    this.isCheckingDelivery = true;
    sessionStorage.setItem('restaurant_delivery_id', deliveryId);

    this.deliveriesApi.getDelivery()
      .subscribe({
        next: (res) => {
          console.log(res);
          if(res.id){
            this.router.navigateByUrl('/home/deliveries/view-delivery');
          }
          else if(res == "not exist"){
            this.existButtonElement.nativeElement.click();
            this.isCheckingDelivery = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.isCheckingDelivery = false;
          this.connectionToast.openToast();
        }
      })
  }

  // TODO: implement at backend with django signals
  createDelivery(){
    let data: Delivery = {
      id: sessionStorage.getItem('restaurant_order_id') as string,
      account: this.customCookie.getCookie('restaurant_id') as string,
      order: sessionStorage.getItem('restaurant_order_id') as string,
      date_delivered: "",
      delivery_location: "",
      delivery_status: "",
    }

    console.log(data);
    this.isCheckingDelivery = true;

    this.deliveriesApi.postDelivery(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.putOrder();
          sessionStorage.setItem('restaurant_delivery_id', res.id);
          this.router.navigateByUrl('/home/deliveries/view-delivery');
          this.isCheckingDelivery = false;
        },
        error: (err) => {
          console.log(err);
          this.isCheckingDelivery = false;
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    this.ordersPrint.printViewOrder();
  }

  onPrintRoll(){
    console.log("lets start printing roll...");
    this.ordersPrint.printOrderRoll();
  }
  
}
