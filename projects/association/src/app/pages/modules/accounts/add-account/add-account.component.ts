import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AccountsApiService } from 'projects/association/src/app/services/modules-api/accounts-api/accounts-api.service';

import { Account } from 'projects/association/src/app/models/modules/accounts/accounts.model';


@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private accountsApi: AccountsApiService
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isSavingAccount = false;

  accountForm = new FormGroup({
    accountName: new FormControl(''),
    accountNumber: new FormControl(''),
    bankName: new FormControl(''),
    accountType: new FormControl('')
  })

  ngOnInit(): void {
  }

  openModal(){
    this.accountForm.controls.accountType.setValue("Savings");
    this.newButton.nativeElement.click();
  }

  createAccount(){
    this.isSavingAccount = true;

    let data: Account = {
      account: this.customCookie.getCookie('association_id') as string,
      account_name: this.accountForm.controls.accountName.value as string,
      account_number: this.accountForm.controls.accountNumber.value as string,
      bank_name: this.accountForm.controls.bankName.value as string,
      account_type: this.accountForm.controls.accountType.value as string
    }

    console.log(data);

    this.accountsApi.postAccount(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('association_account_id', res.id);
            this.router.navigateByUrl('/home/accounts/view-account');
            this.dismissButton.nativeElement.click();
          }
          this.isSavingAccount = false;
        },
        error: (err) => {
          console.log(err);
          this.isSavingAccount = false;
          this.connectionToast.openToast();
        }
      })
  }

}
