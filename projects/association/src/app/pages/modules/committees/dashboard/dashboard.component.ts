import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/committees/dashboard" },
  ];

  ngOnInit(): void {
  }

}
