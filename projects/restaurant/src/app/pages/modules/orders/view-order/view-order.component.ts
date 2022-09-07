import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { OrderItemsComponent } from '../order-items/order-items.component';
import { SelectCustomerComponent } from '../../../../components/select-windows/customers-windows/select-customer/select-customer.component';
import { SelectTableComponent } from '../../../../components/select-windows/tables-windows/select-table/select-table.component';

import { OrdersApiService } from 'projects/restaurant/src/app/services/modules-api/orders-api/orders-api.service';
// import { OrdersPrintService } from 'projects/restaurant/src/app/services/printing/orders-print/orders-print.service';

import { Order } from 'projects/restaurant/src/app/models/modules/orders/orders.model';


@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  constructor(
    private router: Router,
    private ordersApi: OrdersApiService,
    // private ordersPrint: OrdersPrintService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('orderItemsComponentReference', { read: OrderItemsComponent, static: false }) orderItems!: OrderItemsComponent;

  @ViewChild('selectCustomerComponentReference', { read: SelectCustomerComponent, static: false }) selectCustomer!: SelectCustomerComponent;
  @ViewChild('selectTableComponentReference', { read: SelectTableComponent, static: false }) selectTable!: SelectTableComponent;

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

  updateOrder(){
    var customerName = "";

    if(this.selectedCustomerName != ""){
      customerName = this.selectedCustomerName;
    }
    else{
      customerName = this.orderForm.controls.customerName.value as string;
    }

    let data: Order = {
      account: localStorage.getItem('restaurant_id') as string,
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
    console.log(deliveryId);
    sessionStorage.setItem('restaurant_delivery_id', deliveryId);
    this.router.navigateByUrl('/home/deliveries/view-delivery')
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
