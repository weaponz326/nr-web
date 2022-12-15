import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NewLedgerComponent } from '../new-ledger/new-ledger.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-ledger',
  templateUrl: './all-ledger.component.html',
  styleUrls: ['./all-ledger.component.scss']
})
export class AllLedgerComponent implements OnInit {

  constructor(
    private router: Router,
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
