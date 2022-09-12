import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { MenuApiService } from 'projects/restaurant/src/app/services/modules-api/menu-api/menu-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private menuApi: MenuApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/menu/dashboard" },
  ];

  menuGroupCount: number = 0;
  menuItemCount: number = 0;

  ngOnInit(): void {
    this.getMenuGroupCount();
    this.getMenuItemCount();
  }

  getMenuGroupCount(){
    this.menuApi.getMenuGroupCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.menuGroupCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getMenuItemCount(){
    this.menuApi.getMenuItemCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.menuItemCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
