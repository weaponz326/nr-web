import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { AccountsApiService } from 'projects/association/src/app/services/modules-api/accounts-api/accounts-api.service';
// import { AccountsPrintService } from 'projects/association/src/app/services/modules-printing/accounts-print/accounts-print.service';


@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss']
})
export class AllTransactionsComponent implements OnInit {

  constructor(
    private accountsApi: AccountsApiService,
    // private accountsPrint: AccountsPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Transactions", url: "/home/accounts/all-transactions" },
  ];

  transactionsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getUserTransactions(1, 20, "");
  }

 getUserTransactions(page: any, size: any, sortField: any){
    this.isFetchingGridData =  true;

    this.accountsApi.getAllAccountTransactions(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.transactionsGridData = res.results;
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
    this.getUserTransactions(1, 20, column);

    this.currentSortColumn = column;
  }

  onPrint(){
    console.log("lets start printing...");
    // this.accountsPrint.printAllTransactions();
  }

}
