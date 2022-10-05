import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { OrdersApiService } from 'projects/restaurant/src/app/services/modules-api/orders-api/orders-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private ordersApi: OrdersApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/orders/dashboard" },
  ];

  ordersMonthLineDataSets: any[] = [];
  ordersMonthLineLabels: any[] = [];

  allOrderCount: number = 0;

  ordersLineChartConfig: any;

  ngOnInit(): void {
    this.getAllOrderCount();
    this.getOrderAnnotate();
  }

  ngAfterViewInit(): void {
    this.initOrderLineChart();
  }

  initOrderLineChart(){
    let ordersLineChartElement = this.elementRef.nativeElement.querySelector('#ordersLineChart')

    this.ordersLineChartConfig = new Chart(ordersLineChartElement, {
      type: "line",
      data: {
        labels: this.ordersMonthLineLabels,
        datasets: [{
          label: "Orders",
          data: this.ordersMonthLineDataSets,
          fill: true,
          borderColor: "#0000ff88"
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      },
    });
  }

  getAllOrderCount(){
    this.ordersApi.getOrderCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.allOrderCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getOrderAnnotate(){
    this.ordersApi.getOrderAnnotate()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.ordersMonthLineLabels = res.map((x: any) => x.date)
          this.ordersMonthLineDataSets = res.map((x: any) => x.count)

          this.ordersLineChartConfig.destroy();
          this.initOrderLineChart();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
