import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { AccountApiService } from 'projects/school/src/app/services/account-api/account-api.service';


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

  searchFilterValues: any[] = ['All', 'Personal', 'School'];

  searchInput = '';
  searchFilter = 'School';

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
    console.log(sessionStorage.getItem('schoolSearchInput'));

    if(sessionStorage.getItem('schoolSearchInput')){
      this.searchInput = String(sessionStorage.getItem('schoolSearchInput') || '');
      this.searchFilter = String(sessionStorage.getItem('schoolSearchFilter') || 'Personal');
      this.searchQuery = sessionStorage.getItem('schoolSearchInput');

      this.doSearch(1);
    }
  }

  doSearch(page: any){
    if(this.searchInput.trim() != ""){
      // put search input in url just for the looks
      this.router.navigate(['/home/portal/search', { input: this.searchInput, filter: this.searchFilter }]);

      sessionStorage.setItem('schoolSearchInput', this.searchInput);
      sessionStorage.setItem('schoolSearchFilter', this.searchFilter);
      this.searchQuery = this.searchInput;

      this.getSearchResults(page);
    }
  }

  setSearchFilter(event: any, value: any){
    event.preventDefault();
    this.searchFilter = value;
  }

  getSearchResults(page: any){
    this.accountApi.getSearchResults(this.searchInput, page, 15)
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

  getSearchDetail(userId: any){
    sessionStorage.setItem('schoolSearchAccount', userId);

    this.accountApi.getSearchDetail(sessionStorage.getItem('schoolSearchAccount') as string)
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

}
