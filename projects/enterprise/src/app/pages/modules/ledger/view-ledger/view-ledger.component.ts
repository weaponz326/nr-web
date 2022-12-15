import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { LedgerTableComponent } from '../ledger-table/ledger-table.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-view-ledger',
  templateUrl: './view-ledger.component.html',
  styleUrls: ['./view-ledger.component.scss']
})
export class ViewLedgerComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
  ) { }

  @ViewChild('ledgerTableComponentReference', { read: LedgerTableComponent, static: false }) ledgerTables!: LedgerTableComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  @ViewChild('deleteButtonElementReference', { read: ElementRef, static: false }) deleteButtonElement!: ElementRef;

  navHeading: any[] = [
    { text: "All Ledgers", url: "/home/ledger/all-ledger" },
    { text: "View Ledger", url: "/home/ledger/view-ledger" },
  ];

  ledgerFormData: any;

  ioe = 0;

  isLedgerLoading: boolean = false;
  isLedgerSaving: boolean = false;
  isLedgerDeleting: boolean = false;

  ledgerForm = new FormGroup({
    ledgerCode: new FormControl(''),
    ledgerName: new FormControl(''),
    fromDate: new FormControl(),
    toDate: new FormControl(),
  })

  ngOnInit(): void {
    this.getLedger();
  }

  getLedger(){
    this.isLedgerLoading = true;


  }

  updateLedger(){
    let data = {
      account: this.customCookie.getCookie('enteprise_id') as string,
      ledger_name: this.ledgerForm.controls.ledgerCode.value as string,
      ledger_code: this.ledgerForm.controls.ledgerName.value as string,
      from_date: this.ledgerForm.controls.fromDate.value,
      to_date: this.ledgerForm.controls.toDate.value,
    }

    console.log(data);
    this.isLedgerSaving = true;


  }

  confirmDelete(){
    this.deleteButtonElement.nativeElement.click();
  }

  deleteLedger(){
    this.isLedgerDeleting = true;
    console.log('deleting...');


  }

  getIoe(e: any){
    this.ioe = e;
  }

  onPrint(){
    console.log("lets start printing...");
    // this.ledgerPrint.printViewLedger();
  }

}
