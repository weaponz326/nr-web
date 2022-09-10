import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SearchResultsComponent } from '../search-results/search-results.component';
import { SearchDetailComponent } from '../search-detail/search-detail.component';

import { AuthApiService } from 'projects/personal/src/app/services/auth/auth-api/auth-api.service';
import { AccountsApiService } from 'projects/personal/src/app/services/modules-api/accounts-api/accounts-api.service';
import { AdminApiService } from 'projects/restaurant/src/app/services/modules-api/admin-api/admin-api.service';
import { SettingsApiService as RestaurantSettingsApiService } from 'projects/restaurant/src/app/services/modules-api/settings-api/settings-api.service';
import { SettingsApiService as PersonalSettingsApiService } from 'projects/personal/src/app/services/modules-api/settings-api/settings-api.service';

import { Invitation as RestaurantInvitation } from 'projects/restaurant/src/app/models/modules/admin/admin.model';
import { Invitation as PersonalInvitation } from 'projects/personal/src/app/models/modules/settings/settings.model';


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  constructor(
    private router: Router,
    private authApi: AuthApiService,
    private accountsApi: AccountsApiService,
    private adminApi: AdminApiService,
    private restaurantSettingsApi: RestaurantSettingsApiService,
    private personalSettingsApi: PersonalSettingsApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('searchResultsComponentReference', { read: SearchResultsComponent, static: false }) searchResults!: SearchResultsComponent;
  @ViewChild('searchDetailComponentReference', { read: SearchDetailComponent, static: false }) searchDetail!: SearchDetailComponent;

  navHeading: any[] = [
    { text: "New Invitation", url: "/home/admin/search" },
  ];

  searchInput = '';

  isSearchResultsReady = false;
  isSearchDetailReady = false;
  searchResultsData: any;
  searchDetailData: any;
  searchQuery: any;

  sortParams = {
    field: "access_level",
    direction: "asc"
  }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('restaurantAdminSearchInput'));

    if(sessionStorage.getItem('restaurantAdminSearchInput')){
      this.searchQuery = sessionStorage.getItem('restaurantAdminSearchInput');
      this.doSearch();
    }
  }

  doSearch(){
    if (this.searchInput.trim() != ""){
      // put search input in url
      this.router.navigate(['/home/admin/search/', { input: this.searchInput }]);

      sessionStorage.setItem('restaurantAdminSearchInput', this.searchInput);
      this.searchQuery = this.searchInput;

      this.getSearchResult();
    }
  }

  getSearchResult(){
    this.authApi.getSearchList(this.searchInput)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.searchResultsData = res;

          this.isSearchResultsReady = true;
          this.isSearchDetailReady = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getSearchDetail(){
    this.authApi.getSearchDetail(String(sessionStorage.getItem('restaurantAdminSearchUser')))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.searchDetailData = res;

          this.isSearchResultsReady = false;
          this.isSearchDetailReady = true;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  async checkSubscriptionStatus(){
    this.searchDetail.isSending = true;

    const accountUsersResults$ = this.adminApi.getAccountAccountUsers();
    const subscriptionResults$ = this.restaurantSettingsApi.getSubscription();

    const accountUsersData: any = await firstValueFrom(accountUsersResults$);
    const subscriptionData: any = await firstValueFrom(subscriptionResults$);

    console.log(accountUsersData, subscriptionData);

    if (accountUsersData.length >= subscriptionData.number_users){
      console.log('maximum users reached');

      this.searchDetail.isSending = false;
      this.searchDetail.openModal();
    }
    else {
      this.createAccountInvitation();
    }
  }

  createAccountInvitation() {
    let data: RestaurantInvitation = {
      account: localStorage.getItem('restaurant_id') as string,
      invitation_status: 'Awaiting',
      user: this.searchDetailData.id,
    }

    console.log(data);
    this.searchDetail.isSending = true;

    this.adminApi.postInvitation(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.createUserInvitation(res.id);
          this.searchDetail.isSending = false;

          this.router.navigateByUrl('/home/admin/invitations');
        },
        error: (err) => {
          console.log(err);
          this.searchDetail.isSending = false;
          this.connectionToast.openToast();
        }
      })
  }

  async createUserInvitation(invitation_id: any){
    const accountResults$ = this.accountsApi.getAccount();
    const accountData: any = await lastValueFrom(accountResults$)
      .then((res: any) => console.log(res));

    let data: PersonalInvitation = {
      user: this.searchDetailData.id,
      invitation_status: 'Awaiting',
      inviter_type: "Restaurant",
      inviter_invitation_id: invitation_id,
      inviter_id: accountData.id,
      inviter_name: accountData.name,
      inviter_location: accountData.location,
    }

    console.log(data);

    this.personalSettingsApi.postInvitation(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  gotoSearchDetail(userId: any){
    sessionStorage.setItem('restaurantAdminSearchUser', userId);
    this.getSearchDetail();
  }

}
