import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SearchResultsComponent } from '../search-results/search-results.component';
import { SearchDetailComponent } from '../search-detail/search-detail.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthApiService } from 'projects/personal/src/app/services/auth/auth-api/auth-api.service';
import { AccountsApiService } from 'projects/personal/src/app/services/modules-api/accounts-api/accounts-api.service';
import { AdminApiService } from 'projects/association/src/app/services/modules-api/admin-api/admin-api.service';
import { SettingsApiService } from 'projects/association/src/app/services/modules-api/settings-api/settings-api.service';

import { Invitation } from 'projects/association/src/app/models/modules/admin/admin.model';


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private authApi: AuthApiService,
    private accountsApi: AccountsApiService,
    private adminApi: AdminApiService,
    private settingsApi: SettingsApiService,
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

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;
  
  isNextDisabled = false;
  isPrevDisabled = false;

  ngOnInit(): void {
    console.log(sessionStorage.getItem('associationAdminSearchInput'));

    if(sessionStorage.getItem('associationAdminSearchInput')){
      this.searchQuery = sessionStorage.getItem('associationAdminSearchInput');
      this.doSearch(1);
    }
  }

  doSearch(page: any){
    if (this.searchInput.trim() != ""){
      // put search input in url
      this.router.navigate(['/home/admin/search/', { input: this.searchInput }]);

      sessionStorage.setItem('associationAdminSearchInput', this.searchInput);
      this.searchQuery = this.searchInput;

      this.getSearchResult(page);
    }
  }

  getSearchResult(page: any){
    // TODO: make page size dynamic
    this.authApi.getSearchList(this.searchInput, page, 15)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.searchResultsData = res.results;

          this.isSearchResultsReady = true;
          this.isSearchDetailReady = false;

          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;
          
          if(this.currentPage == 1)
            this.isPrevDisabled = true;

          if(this.currentPage == this.totalPages)
            this.isNextDisabled = true;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getSearchDetail(){
    this.authApi.getSearchDetail(String(sessionStorage.getItem('associationAdminSearchUser')))
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
    const subscriptionResults$ = this.settingsApi.getSubscription();

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
    let data: Invitation = {
      user: this.searchDetailData.id,
      account: this.customCookie.getCookie('association_id') as string,
      account_type: 'Association',
      invitation_status: 'Awaiting',
      date_confirmed: null
    }

    console.log(data);
    this.searchDetail.isSending = true;

    this.adminApi.postInvitation(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.searchDetail.isSending = false;

          if(res.id)
            this.router.navigateByUrl('/home/admin/invitations');
        },
        error: (err) => {
          console.log(err);
          this.searchDetail.isSending = false;
          this.connectionToast.openToast();
        }
      })
  }

  gotoSearchDetail(userId: any){
    sessionStorage.setItem('associationAdminSearchUser', userId);
    this.getSearchDetail();
  }

}
