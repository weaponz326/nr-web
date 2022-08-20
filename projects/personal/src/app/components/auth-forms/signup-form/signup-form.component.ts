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
  passErrors: any;
  rePassErrors: any;
  nfErrors: any;
  
  signupForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      about: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      rePassword: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }

  onSubmit(){
    let userData = {
      email: this.signupForm.controls.email.value,
      password: this.signupForm.controls.password.value,
      re_password: this.signupForm.controls.rePassword.value,
      first_name: this.signupForm.controls.firstName.value,
      last_name: this.signupForm.controls.lastName.value,
      location: this.signupForm.controls.location.value,
      about: this.signupForm.controls.about.value,
    }

    this.saved = true;
    this.isSending = true;

    this.authApi.postSignup(userData)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.email){
            this.showPrompt = true;
          }
          this.isSending = false;
        },
        error: (err) => {
          console.log(err);
          this.fnErrors = err.error?.first_name;
          this.lnErrors = err.error?.last_name;
          this.locErrors = err.error?.location;
          this.abtErrors = err.error?.about;
          this.emailErrors = err.error?.email;
          this.passErrors = err.error?.password;
          this.rePassErrors = err.error?.re_password;
          this.nfErrors = err.error?.non_field_errors;

          this.isSending = false;
          this.signupStepper.selectedIndex = 0;
        }
      })  

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
