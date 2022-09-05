import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectCustomerComponent } from '../../../../components/select-windows/customers-windows/select-customer/select-customer.component';
import { SelectTableComponent } from '../../../../components/select-windows/tables-windows/select-table/select-table.component';

import { OrdersApiService } from 'projects/restaurant/src/app/services/modules-api/orders-api/orders-api.service';
import { DeliveriesApiService } from 'projects/restaurant/src/app/services/modules-api/deliveries-api/deliveries-api.service';

import { Order } from 'projects/restaurant/src/app/models/modules/orders/orders.model';
import { Delivery } from 'projects/restaurant/src/app/models/modules/deliveries/deliveries.model';
import { Table } from 'projects/restaurant/src/app/models/modules/tables/tables.model';


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  constructor(
    private router: Router,
    private ordersApi: OrdersApiService,
    private deliveriesApi: DeliveriesApiService
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  @ViewChild('selectCustomerComponentReference', { read: SelectCustomerComponent, static: false }) selectCustomer!: SelectCustomerComponent;
  @ViewChild('selectTableComponentReference', { read: SelectTableComponent, static: false }) selectTable!: SelectTableComponent;

  selectedCustomerId = "";
  selectedTableId = "";

  isOrderSaving = false;

  orderForm = new FormGroup({
    orderCode: new FormControl(''),
    orderDate: new FormControl(''),
    customerName: new FormControl(''),
    orderType: new FormControl(''),
    tableNumber: new FormControl({value: '', disabled: true}),
  })


  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.orderForm.controls.orderDate.setValue(new Date().toISOString().slice(0, 16))
  }

  createOrder(){
    let data: Order = {
      account: localStorage.getItem('restaurant_id') as string,
      order_code: this.orderForm.controls.orderCode.value as string,
      order_date: this.orderForm.controls.orderDate.value as string,
      order_type: this.orderForm.controls.orderType.value as string,
      total_amount: 0,
      order_status: "",
      customer: this.selectedCustomerId,
      table: this.selectedTableId,
    }

    console.log(data);
    this.isOrderSaving = true;

    this.ordersApi.postOrder(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('restaurant_order_id', res.id);

            if (data.order_type == "Delivery"){
              // this.createDelivery();
              // TODO: implement with django signals on backend
            }

            this.dismissButton.nativeElement.click();
            this.isOrderSaving = false;
            this.router.navigateByUrl('/home/orders/view-order');
          }
        },
        error: (err) => {
          console.log(err);
          this.isOrderSaving = false;
          this.connectionToast.openToast();
        }
      })

    console.log(data);
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

    this.selectedTableId = tableData.id;
    this.orderForm.controls.tableNumber.setValue(tableData.table_number);
  }

}
