import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { LedgerTableComponent } from '../ledger-table/ledger-table.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { LedgerApiService } from 'projects/enterprise/src/app/services/modules-api/ledger-api/ledger-api.service';

import { Ledger } from 'projects/enterprise/src/app/models/modules/ledger/ledger.model';


@Component({
  selector: 'app-view-ledger',
  templateUrl: './view-ledger.component.html',
  styleUrls: ['./view-ledger.component.scss']
})
export class ViewLedgerComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private ledgerApi: LedgerApiService,
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
    this.getLedgerCodeConfig();
  }

  getLedger(){
    this.isLedgerLoading = true;

    this.ledgerApi.getLedger()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.ledgerFormData = res;

          this.ledgerForm.controls.ledgerCode.setValue(this.ledgerFormData.ledger_code);
          this.ledgerForm.controls.ledgerName.setValue(this.ledgerFormData.ledger_name);
          this.ledgerForm.controls.fromDate.setValue(this.ledgerFormData.from_date);
          this.ledgerForm.controls.toDate.setValue(this.ledgerFormData.to_date);

          this.isLedgerLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLedgerLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateLedger(){
    let data: Ledger = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      ledger_code: this.ledgerForm.controls.ledgerCode.value as string,
      ledger_name: this.ledgerForm.controls.ledgerName.value as string,
      from_date: this.ledgerForm.controls.fromDate.value,
      to_date: this.ledgerForm.controls.toDate.value,
    }

    console.log(data);
    this.isLedgerSaving = true;

    this.ledgerApi.putLedger(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isLedgerSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isLedgerSaving = false;
        }
      })
  }

  confirmDelete(){
    this.deleteButtonElement.nativeElement.click();
  }

  deleteLedger(){
    this.isLedgerDeleting = true;
    console.log('deleting...');

    this.ledgerApi.deleteLedger()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/ledger/all-ledger');
          this.isLedgerDeleting = false;
        },
        error: (err) => {
          console.log(err);
          this.isLedgerDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  getIoe(e: any){
    this.ioe = e;
  }

  getLedgerCodeConfig(){
    this.ledgerApi.getLedgerCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.entry_mode == "Auto")
            this.ledgerForm.controls.ledgerCode.disable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.ledgerPrint.printViewLedger();
  }

}
