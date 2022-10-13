import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';
import { AuthApiService } from '../../../services/auth/auth-api/auth-api.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private authApi: AuthApiService
  ) { }

  saved: boolean = false;
  isSending: boolean = false;
  showPrompt: boolean = false;
  sendVerification: boolean = false;

  suiteRegistrationType: string = "";

  emailErrors: any;
  passErrors: any;
  nfErrors: any;
  detailErrors: any;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.getSource();
  }

  getSource(){
    this.suiteRegistrationType = sessionStorage.getItem('app_source') as string;
  }

  onSubmit(){
    this.saved = true;
    this.isSending = true;

    this.authApi.postLogin(this.loginForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          
          if (res.auth_token){
            this.customCookie.setCookie('token', res.auth_token);
            // localStorage.setItem('token', res.auth_token);

            this.getUser();
          }
        },
        error: (err) => {
          console.log(err);
          this.emailErrors = err.error.email;
          this.passErrors = err.error.password;
          this.nfErrors = err.error.non_field_errors;
          this.detailErrors = err.error.detail;

          this.isSending = false;
        }
      })
  }

  getUser(){
    this.authApi.getUser()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id) {            
            // localStorage.setItem('personal_id', res.id);
            this.customCookie.setCookie('personal_id', res.id);
            this.registrationType();
          }

          this.isSending = false;
        },
        error: (err) => {
          console.log(err);          
        }
      })
  }

  registrationType(){
    if(sessionStorage.getItem("isSuiteRegistration") == "OK"){
      this.showPrompt = true;
    }
    else{
      window.location.href = "/";
    }

    sessionStorage.removeItem("isSuiteRegistration");
  }

  registrationRedirect(){
    window.location.href = "/register";
  }

}
