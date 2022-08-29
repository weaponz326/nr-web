import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AddAccountComponent } from '../add-account/add-account.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { AccountsApiService } from 'projects/personal/src/app/services/modules-api/accounts-api/accounts-api.service';
import { AccountsPrintService } from 'projects/personal/src/app/services/modules-printing/accounts-print/accounts-print.service';


@Component({
  selector: 'app-all-accounts',
  templateUrl: './all-accounts.component.html',
  styleUrls: ['./all-accounts.component.scss']
})
export class AllAccountsComponent implements OnInit {

  constructor(
    private router: Router,
    private accountsApi: AccountsApiService,
    private accountsPrint: AccountsPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('addAccountComponentReference', { read: AddAccountComponent, static: false }) addAccount!: AddAccountComponent;

  navHeading: any[] = [
    { text: "All Accounts", url: "/home/accounts/all-accounts" },
  ];

  accountsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getUserAccounts(1, 20, "");
  }

 getUserAccounts(page: any, size: any, sortField: any){
    this.isFetchingGridData =  true;

    this.accountsApi.getUserAccounts(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.accountsGridData = res.results;
          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;

          this.isFetchingGridData = false;
          if(this.totalItems == 0)
            this.isDataAvailable = false
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isFetchingGridData = false;
          console.log(err);
        }
      })
  }

  sortTable(column: any){
    console.log(column);
    this.getUserAccounts(1, 20, column);

    this.currentSortColumn = column;
  }

  viewAccount(accountId: any){
    console.log(accountId);

    sessionStorage.setItem("personal_account_id", accountId);
    this.router.navigateByUrl("/home/accounts/view-account");
  }

  onPrint(){
    console.log("lets start printing...");
    this.accountsPrint.printAllAccounts();
  }

}
