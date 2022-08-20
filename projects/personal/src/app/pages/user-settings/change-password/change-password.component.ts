import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthApiService } from '../../../services/auth/auth-api/auth-api.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private authApi: AuthApiService) { }

  isSending: boolean = false;
  showPrompt: boolean = false;

  passErrors: any;
  rePassErrors: any;
  curPassErrors: any;
  nfErrors: any;
  detailError: any;
  
  passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    rePassword: new FormControl('', [Validators.required]),
    currentPassword: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
  }

  onSubmit(){
    let passwordData = {
      new_password: this.passwordForm.controls.password.value,
      re_new_password: this.passwordForm.controls.rePassword.value,
      current_password: this.passwordForm.controls.currentPassword.value,

    }

    this.isSending = true;
    console.log(passwordData);
    this.authApi.postChangePassword(this.passwordForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isSending = false;
        },
        error: (err) => {
          console.log(err);
          this.passErrors = err.error.new_password;
          this.rePassErrors = err.error.re_new_password;
          this.curPassErrors = err.error.current_password;
          this.nfErrors = err.error.non_field_errors;
          this.detailError = err.error.detail;

          this.isSending = false;
        }
      })
  }

}
