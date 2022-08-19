import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatStepper } from '@angular/material/stepper';

import { AuthApiService } from '../../../services/auth/auth-api/auth-api.service';
// import { User } from '../../../models/user/user.model';
// import { ExtendedProfile } from '../../../models/modules/settings/settings.model';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  constructor(private authApi: AuthApiService) { }

  @ViewChild('stepper') private signupStepper!: MatStepper;  

  saved: boolean = false;
  isSending: boolean = false;
  showPrompt: boolean = false;

  registeredUserId = "";
  suiteRegistrationType: string = "";

  fnErrors: any;
  lnErrors: any;
  locErrors: any;
  abtErrors: any;
  emailErrors: any;
  pass1Errors: any;
  pass2Errors: any;
  nfErrors: any;
  
  signupForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      about: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password1: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }

  onSubmit(){
    let userData = {
      email: this.signupForm.controls.email.value,
      password1: this.signupForm.controls.password1.value,
      password2: this.signupForm.controls.password2.value,
      first_name: this.signupForm.controls.firstName.value,
      last_name: this.signupForm.controls.lastName.value,
      location: this.signupForm.controls.location.value,
      about: this.signupForm.controls.about.value,
    }

    this.saved = true;

    if (this.signupForm.valid && this.signupForm.controls.password1.value == this.signupForm.controls.password2.value){
      this.isSending = true;

      this.authApi.postSignup(userData)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.auth_token){
              localStorage.setItem('auth_token', res.auth_token);
              this.showPrompt = true;
            }
            this.isSending = false;
          },
          error: (err) => {
            console.log(err);
            this.fnErrors = err.errors?.first_name;
            this.lnErrors = err.errors?.last_name;
            this.locErrors = err.errors?.location;
            this.abtErrors = err.errors?.about;
            this.emailErrors = err.error?.email;
            this.pass1Errors = err.error?.password1;
            this.pass2Errors = err.error?.password2;
            this.nfErrors = err.error?.non_field_errors;

            this.isSending = false;
            this.signupStepper.selectedIndex = 0;
          }
        })  
    }
    else{
      console.log("form is invalid");
      this.signupStepper.selectedIndex = 0;
    }

    console.log(this.signupForm.value);
  }

  createExtendedProfile(){
    // let data: ExtendedProfile = {
    //   date_of_birth: "",
    //   gender: "",
    //   phone: "",
    //   address: "",
    //   country: "",
    //   state: "",
    //   city: "",
    // }

    // TODO:
    // post extended profile
  }

  onAddressChange(address: any) {
    this.signupForm.controls.location.setValue(address.formatted_address);
    console.log(address);
  }

}
