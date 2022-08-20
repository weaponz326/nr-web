import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthApiService } from '../../../services/auth/auth-api/auth-api.service';


@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {

  constructor(private authApi: AuthApiService) { }

  isSending: boolean = false;

  passErrors: any;
  nfErrors: any;
  detailError: any;
  
  deleteForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
  }

  onSubmit(){
    this.isSending = true;
    console.log(this.deleteForm.value);
    this.authApi.deleteUser(this.deleteForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          window.location.href = "/";
        },
        error: (err) => {
          console.log(err);
          this.passErrors = err.error.current_password;
          this.nfErrors = err.error.non_field_errors;
          this.detailError = err.error.detail;

          this.isSending = false;
        }
      })
  }

}
