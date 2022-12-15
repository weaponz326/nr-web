import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-new-ledger',
  templateUrl: './new-ledger.component.html',
  styleUrls: ['./new-ledger.component.scss']
})
export class NewLedgerComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isSavingLedger = false;

  ledgerForm = new FormGroup({
    ledgerCode: new FormControl(''),
    ledgerName: new FormControl(''),
    fromDate: new FormControl(),
    toDate: new FormControl(),
  })

  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
  }

  createLedger(){
    this.isSavingLedger = true;

    let data = {
      account: this.customCookie.getCookie('enteprise_id') as string,
      ledger_name: this.ledgerForm.controls.ledgerCode.value as string,
      ledger_code: this.ledgerForm.controls.ledgerName.value as string,
      from_date: this.ledgerForm.controls.fromDate.value,
      to_date: this.ledgerForm.controls.toDate.value,
    }

    console.log(data);


  }

}
