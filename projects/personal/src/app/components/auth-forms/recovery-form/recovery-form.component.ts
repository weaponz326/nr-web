import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthApiService } from '../../../services/auth/auth-api/auth-api.service';


@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html',
  styleUrls: ['./recovery-form.component.scss']
})
export class RecoveryFormComponent implements OnInit {

  constructor(private authApi: AuthApiService) { }

  isSending: boolean = false;
  showPrompt: boolean = false;

  emailErrors: any;
  nfErrors: any;
  
  recoveryForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  ngOnInit(): void {
  }

  onSubmit(){
    this.isSending = true;
    console.log(this.recoveryForm.value);
    this.authApi.postRecoveryEmail(this.recoveryForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.showPrompt =  true;
          this.isSending = false;
        },
        error: (err) => {
          console.log(err);
          this.emailErrors = err.error.email;
          this.nfErrors = err.error.non_field_errors;

          this.isSending = false;
        }
      })
  }

}
