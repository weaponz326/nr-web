import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { AccountApiService } from 'projects/restaurant/src/app/services/account-api/account-api.service';


@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})
export class SearchViewComponent implements OnInit {

  constructor(
    private router: Router,
    private accountApi: AccountApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Rink", url: "/home/portal/search" },
  ];

  searchFilterValues: any[] = ['All', 'Personal', 'Restaurant'];

  searchInput = '';
  searchFilter = 'Restaurant';

  isSearchResultsReady = false;
  isSearchDetailReady = false;
  searchResults: any;
  searchDetail: any;
  searchQuery: any;

  ngOnInit(): void {
    console.log(sessionStorage.getItem('personalSearchInput'));

    if(sessionStorage.getItem('personalSearchInput')){
      this.searchInput = String(sessionStorage.getItem('personalSearchInput') || '');
      this.searchFilter = String(sessionStorage.getItem('personalSearchFilter') || 'Personal');
      this.searchQuery = sessionStorage.getItem('personalSearchInput');

      this.doSearch();
    }
  }

  doSearch(){
    if(this.searchInput.trim() != ""){
      // put search input in url just for the looks
      this.router.navigate(['/home/portal/search', { input: this.searchInput, filter: this.searchFilter }]);

      sessionStorage.setItem('personalSearchInput', this.searchInput);
      sessionStorage.setItem('personalSearchFilter', this.searchFilter);
      this.searchQuery = this.searchInput;

      this.getSearchResults();
    }
  }

  setSearchFilter(event: any, value: any){
    event.preventDefault();
    this.searchFilter = value;
  }

  getSearchResults(){
    this.accountApi.getSearchResults(this.searchInput)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.searchResults = res;

          this.isSearchResultsReady = true;
          this.isSearchDetailReady = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getSearchDetail(userId: any){
    sessionStorage.setItem('personalSearchUser', userId);

    this.accountApi.getSearchDetail(sessionStorage.getItem('personalSearchUser') as string)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.searchDetail = res;

          this.isSearchResultsReady = false;
          this.isSearchDetailReady = true;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
