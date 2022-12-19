import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NewLedgerComponent } from '../new-ledger/new-ledger.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { LedgerApiService } from 'projects/enterprise/src/app/services/modules-api/ledger-api/ledger-api.service';


@Component({
  selector: 'app-all-ledger',
  templateUrl: './all-ledger.component.html',
  styleUrls: ['./all-ledger.component.scss']
})
export class AllLedgerComponent implements OnInit {

  constructor(
    private router: Router,
    private ledgerApi: LedgerApiService,
  ) { }

  @ViewChild('newLedgerComponentReference', { read: NewLedgerComponent, static: false }) newLedger!: NewLedgerComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Ledgers", url: "/home/ledger/all-ledger" },
  ];

  ledgerGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getUserLedger(1,20, "");
  }

  getUserLedger(page: any, size: any, sortField: any){
    this.isFetchingGridData =  true;

    this.ledgerApi.getAccountLedger(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.ledgerGridData = res.results;
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
    this.getUserLedger(1, 20, column);

    this.currentSortColumn = column;
  }

  viewLedger(ledgerId: any){
    console.log(ledgerId);

    sessionStorage.setItem("personal_ledger_id", ledgerId);
    this.router.navigateByUrl("/home/ledger/view-ledger");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.ledgerPrint.printAllLedger();
  }

}
