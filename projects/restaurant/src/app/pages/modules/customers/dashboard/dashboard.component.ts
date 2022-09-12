import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { CustomersApiService } from 'projects/restaurant/src/app/services/modules-api/customers-api/customers-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private customersApi: CustomersApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/customers/dashboard" },
  ];

  allCustomerCount: number = 0;

  ngOnInit(): void {
    this.getAllCustomerCount();
  }

  getAllCustomerCount(){
    this.customersApi.getCustomerCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.allCustomerCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
