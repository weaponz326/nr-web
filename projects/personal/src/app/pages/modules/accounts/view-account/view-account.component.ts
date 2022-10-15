import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountTransactionsComponent } from '../account-transactions/account-transactions.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AccountsApiService } from 'projects/personal/src/app/services/modules-api/accounts-api/accounts-api.service';
import { AccountsPrintService } from 'projects/personal/src/app/services/modules-printing/accounts-print/accounts-print.service';

import { Account } from 'projects/personal/src/app/models/modules/accounts/accounts.model';


@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.scss']
})
export class ViewAccountComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private accountsApi: AccountsApiService,
    private accountsPrint: AccountsPrintService
  ) { }

  @ViewChild('accountTransactionsComponentReference', { read: AccountTransactionsComponent, static: false }) accountTransactions!: AccountTransactionsComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Accounts", url: "/home/accounts/all-accounts" },
    { text: "View Account", url: "/home/accounts/view-account" },
  ];

  accountFormData: any;

  balance = 0;

  isAccountLoading: boolean = false;
  isAccountSaving: boolean = false;
  isAccountDeleting: boolean = false;

  accountForm = new FormGroup({
    accountName: new FormControl(''),
    accountNumber: new FormControl(''),
    bankName: new FormControl(''),
    accountType: new FormControl('')
  })

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount(){
    this.isAccountLoading = true;

    this.accountsApi.getAccount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.accountFormData = res;

          this.accountForm.controls.accountName.setValue(this.accountFormData.account_name);
          this.accountForm.controls.accountNumber.setValue(this.accountFormData.account_number);
          this.accountForm.controls.bankName.setValue(this.accountFormData.bank_name);
          this.accountForm.controls.accountType.setValue(this.accountFormData.account_type);

          // this.accountTransactions.addTransaction.transactionAccount = this.accountFormData;
          // this.accountTransactions.editTransaction.transactionAccount = this.accountFormData;

          this.isAccountLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isAccountLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateAccount(){
    let data: Account = {
      user: this.customCookie.getCookie('personal_id') as string,
      account_name: this.accountForm.controls.accountName.value as string,
      account_number: this.accountForm.controls.accountNumber.value as string,
      bank_name: this.accountForm.controls.bankName.value as string,
      account_type: this.accountForm.controls.accountType.value as string
    }

    console.log(data);
    this.isAccountSaving = true;

    this.accountsApi.putAccount(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isAccountSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isAccountSaving = false;
        }
      })
  }

  deleteAccount(){
    this.isAccountDeleting = true;

    this.accountsApi.deleteAccount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/accounts/all-accounts');
          this.isAccountDeleting = false;
        },
        error: (err) => {
          console.log(err);
          this.isAccountDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  setBalance(e: any){
    console.log(e);
    this.balance = e;
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  onPrint(){
    console.log("lets start printing...");
    this.accountsPrint.printViewAccount();
  }

}
