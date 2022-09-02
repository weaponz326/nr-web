import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserTopComponent } from 'projects/personal/src/app/components/suite-landing/user-top/user-top.component';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.page.html',
  styleUrls: ['./user-landing.page.scss']
})
export class UserLandingPage implements OnInit {

  constructor(
    private router: Router,
    // private adminApi: AdminApiService,
    // private settingsApi: SettingsApiService
  ) { }

  @ViewChild('userTopComponentReference', { read: UserTopComponent, static: false }) userTop!: UserTopComponent;
  // @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  accountsData: any;
  isAccountLoading: boolean = false;
  isAccountChecking: boolean = false;

  ngOnInit(): void {
    this.getUserAccountUser();
  }

  getUserAccountUser(){
    this.isAccountLoading = true;

    // this.adminApi.getUserAccountUser()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.accountsData = res.docs;
    //       this.isAccountLoading = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isAccountLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  checkAccountActive(data: any){
    this.isAccountChecking = true;
    console.log(data.data());

    localStorage.setItem('restaurant_id', data.data().account.id);

    // this.settingsApi.getSubscription()
    //   .then(
    //     (res: any) => {
    //       console.log(res.data());
    //       this.isAccountChecking = false;

    //       if (res.data().status == "Active" || res.data().status == "Active" && data.data().account.data.created_by == localStorage.getItem('personal_id')){
    //         sessionStorage.setItem('restaurant_account_user_id', data.id);
    //         this.router.navigateByUrl('/home');
    //       }
    //       else {
    //         localStorage.removeItem('restaurant_id');
    //         this.userTop.openSubscriptionModal();
    //       }
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isAccountChecking = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  // // NB: function not being used currently
  // activateAccount(data: any){
  //   console.log(data);
  //   localStorage.setItem('restaurant_id', data.data().account.id);
  //   sessionStorage.setItem('restaurant_account_user_id', data.id);
  //   this.router.navigateByUrl('/home');

  //   // TODO: store selected account in server session
  // }

  gotoAbout() {
    console.log('to about...');
    document.querySelector('#aboutComponentReference')?.scrollIntoView({ behavior: 'smooth' });
  }

  gotoPricing() {
    console.log('to pricing...');
    document.querySelector('#pricingComponentReference')?.scrollIntoView({ behavior: 'smooth'});
  }

  gotoContact() {
    console.log('to contact...');
    document.querySelector('#contactComponentReference')?.scrollIntoView({ behavior: 'smooth'});
  }

}
