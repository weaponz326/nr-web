import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthApiService } from '../../../services/auth/auth-api/auth-api.service';


@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {

  constructor(private authApi: AuthApiService) { }

  isSending: boolean = false;
  showPrompt: boolean = false;

  emailErrors: any;
  reEmailErrors: any;
  passErrors: any;
  nfErrors: any;
  detailError: any;
  
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    reEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
  }

  onSubmit(){
    let emailData = {
      new_email: this.emailForm.controls.email.value,
      re_new_email: this.emailForm.controls.reEmail.value,
      current_password: this.emailForm.controls.password.value,

    }

    this.isSending = true;
    console.log(emailData);
    this.authApi.postChangeEmail(this.emailForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isSending = false;
        },
        error: (err) => {
          console.log(err);
          this.emailErrors = err.error.new_email;
          this.reEmailErrors = err.error.re_new_email;
          this.passErrors = err.error.current_password;
          this.nfErrors = err.error.non_field_errors;
          this.detailError = err.error.detail;

          this.isSending = false;
        }
      })
  }

}
