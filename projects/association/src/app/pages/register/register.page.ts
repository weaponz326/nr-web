import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AccountApiService } from '../../services/account-api/account-api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
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
            this.customCookie.setCookie('association_id', res.id);
          }

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
