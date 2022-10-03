import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthApiService } from '../../../services/auth/auth-api/auth-api.service';


@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.scss']
})
export class ResetFormComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authApi: AuthApiService
  ) { }

  saved: boolean = false;
  isSending: boolean = false;
  showPrompt: boolean = false;

  queryParams: any;

  passErrors: any;
  rePassErrors: any;
  nfErrors: any;

  resetForm = new FormGroup({
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.getQueryParams();
  }

  getQueryParams(){
    this.route.queryParams
      .subscribe(params => {
        console.log(params);

        this.queryParams = {
          uid: this.route.snapshot.queryParamMap.get('uid'),
          token: this.route.snapshot.queryParamMap.get('token')
        }
      });
  }

  onSubmit(){
    let data = {
      uid: this.queryParams.uid,
      token: this.queryParams.token,
      new_password: this.resetForm.controls.password,
      re_new_password: this.resetForm.controls.rePassword,
    }

    this.saved = true;
    this.isSending = true;

    this.authApi.postResetPassword(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.showPrompt = true;
        },
        error: (err) => {
          console.log(err);
          this.showPrompt = true;
          this.isSending = false;
          
          this.passErrors = err.error.new_password;
          this.rePassErrors = err.error?.re_password;
          this.nfErrors = err.error.non_field_errors;

        }
      })
  }


}
