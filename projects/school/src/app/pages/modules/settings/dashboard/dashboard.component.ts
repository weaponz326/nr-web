import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { SettingsApiService } from 'projects/school/src/app/services/modules-api/settings-api/settings-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private settingsApi: SettingsApiService) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/settings/dashboard" },
  ];

  subscriptionType = "";

  ngOnInit(): void {
    this.getSubscription();    
  }

  getSubscription(){
    this.settingsApi.getSubscription()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.subscriptionType = res.subscription_type;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
}
