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

  restaurantData: any[] = [];
  schoolData: any[] = [];
  enterpriseData: any[] = [];
  associationData: any[] = [];
  hospitalData: any[] = [];
  hotelData: any[] = [];
  shopData: any[] = [];
  productionData: any[] = [];

  suiteData = [
    this.restaurantData,
    this.schoolData,
    this.enterpriseData,
    this.associationData,
    this.hospitalData,
    this.hotelData,
    this.shopData,
    this.productionData,
  ]

  suiteNames = [
    'Restaurant',
    'School',
    'Enterprise',
    'Association',
    'Hospital',
    'Hotel',
    'Shop',
    'Production',
  ]

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getAuth();
    this.getSuiteAccounts();
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

  // TODO:
  getSuiteAccounts(){
    // this.suiteUrls.forEach((url, index) => {
    //   this.settingsApi.getUserAccounts(url)
    //     .subscribe({
    //       next: (res) => {
    //         console.log(res);
    //         this.suiteData[index] = res;
    //       },
    //       error: (err) => {
    //         console.log(err);
    //         this.connectionToast.openToast();
    //       }
    //     })
    // });

    // this.suiteData.forEach((suite) => console.log(suite));
  }

}
