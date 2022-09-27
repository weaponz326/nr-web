import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { AuthApiService } from 'projects/personal/src/app/services/auth/auth-api/auth-api.service';
import { SettingsApiService } from 'projects/personal/src/app/services/modules-api/settings-api/settings-api.service';

@Component({
  selector: 'app-all-accounts',
  templateUrl: './all-accounts.component.html',
  styleUrls: ['./all-accounts.component.scss']
})
export class AllAccountsComponent implements OnInit {

  constructor(
    private authApi: AuthApiService,
    private settingsApi: SettingsApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Accounts", url: "/home/profile/all-accounts" },
  ];

  userData: any;
  suiteData: any = [];

  suiteNames = [
    'Restaurant',
    // 'School',
    // 'Enterprise',
    // 'Association',
    // 'Hospital',
    // 'Hotel',
    // 'Shop',
    // 'Production',
  ]

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getAuth();
    this.getAllUserSuiteAccount();
  }

  getAuth(){
    this.authApi.getUser()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.userData = res
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
    })
  }

  getAllUserSuiteAccount(){
    this.settingsApi.getAllUserSuiteAccount()
      .subscribe({
        next: (res) => {
          console.log(res)

          this.suiteData[0] = res.restaurant;
          // this.schoolData = res.school;

          console.log(this.suiteData);
        },
        error: (err) => {
          console.log(err)
          this.connectionToast.openToast();
        }
      })
  }

}
