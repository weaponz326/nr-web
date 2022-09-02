import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountApiService } from '../../services/account-api/account-api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  constructor(
    private accountApi: AccountApiService
  ) { }

  isSending: boolean = false;
  showPrompt: boolean = false;
  errors: any;

  ngOnInit(): void {
  }

  onSubmit(accountData: any){
    this.isSending = true;

    this.accountApi.postAccount(accountData)
      .subscribe({
        next: (res) => {
          console.log(res);
          if(res.id){
            this.showPrompt = true;
            localStorage.setItem('restaurant_id', res.id);
          }

          // // TODO: implement with receivers at backend
          // this.createAccountUser(accountData);
          // this.createExtendedProfile();
          // this.createSubscription();

          this.isSending = false;
        },
        error: (err) => {
          console.log(err);
          this.errors = err.errors;
          this.isSending = false;
        }
      })
  }

}
