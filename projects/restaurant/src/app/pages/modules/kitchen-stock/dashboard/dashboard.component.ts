import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { KitchenStockApiService } from 'projects/restaurant/src/app/services/modules-api/kitchen-stock-api/kitchen-stock-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private kitchenStockApi: KitchenStockApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/kitchen-stock/dashboard" },
  ];

  allStockItemCount: number = 0;
  outOfStockCount: number = 0;

  ordersLineChartConfig: any;

  ngOnInit(): void {
    this.getAllStockItemCount();
    this.getOutOfStockCount();
  }

  getAllStockItemCount(){
    this.kitchenStockApi.getStockItemCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.allStockItemCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getOutOfStockCount(){
    this.kitchenStockApi.getOutOfStockCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.outOfStockCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
