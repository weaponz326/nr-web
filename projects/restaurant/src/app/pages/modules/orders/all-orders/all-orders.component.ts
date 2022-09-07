import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AddOrderComponent } from '../add-order/add-order.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { OrdersApiService } from 'projects/restaurant/src/app/services/modules-api/orders-api/orders-api.service';
// import { OrdersPrintService } from 'projects/restaurant/src/app/services/printing/orders-print/orders-print.service';


@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {

  constructor(
    private router: Router,
    private ordersApi: OrdersApiService,
    // private ordersPrint: OrdersPrintService
  ) { }

  @ViewChild('addOrderComponentReference', { read: AddOrderComponent, static: false }) addOrder!: AddOrderComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Orders", url: "/home/orders/all-orders" },
  ];

  ordersGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountOrder(1, 20, "-created_at");
  }

  getAccountOrder(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.ordersApi.getAccountOrder(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.ordersGridData = res.results;

          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;

          this.isFetchingGridData = false;
          if(this.totalItems == 0)
            this.isDataAvailable = false
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountOrder(1, 20, column);

    this.currentSortColumn = column;
  }

  viewOrder(orderId: any){
    console.log(orderId);

    sessionStorage.setItem("restaurant_order_id", orderId);
    this.router.navigateByUrl("/home/orders/view-order");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.ordersPrint.printAllOrders()
  }

}
