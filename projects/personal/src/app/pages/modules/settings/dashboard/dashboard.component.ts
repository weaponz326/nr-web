import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { SettingsApiService } from 'projects/personal/src/app/services/modules-api/settings-api/settings-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private settingsApi: SettingsApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/calendar/dashboard" },
  ];

  allAccountData: any;

  allAccountCount: number = 0;

  accountBarChartConfig: any;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initAccountBarChart();
  }

  initAccountBarChart(){
    let accountBarChartElement = this.elementRef.nativeElement.querySelector('#accountBarChart')

    this.accountBarChartConfig = new Chart(accountBarChartElement, {
      type: "line",
      data: {
        labels: [],
        datasets: [{
          data: [],
        }]
      },
      options: {},
    });
  }

}
