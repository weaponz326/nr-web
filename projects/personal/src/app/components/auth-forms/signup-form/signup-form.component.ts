import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatStepper } from '@angular/material/stepper';

// import { User } from '../../../models/user/user.model';
// import { ExtendedProfile } from '../../../models/modules/settings/settings.model';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  constructor() { }

  @ViewChild('stepper') private signupStepper!: MatStepper;  

  authError = "";

  saved: boolean = false;
  isSending: boolean = false;
  showPrompt: boolean = false;

  registeredUserId = "";
  suiteRegistrationType: string = "";

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
    this.saved = true;

    if (this.signupForm.valid && this.signupForm.controls.password1.value == this.signupForm.controls.password2.value){
      this.isSending = true;

      // TODO:
      // post auth
    }
    else{
      console.log("form is invalid");
      this.signupStepper.selectedIndex = 0;
    }

    console.log(this.signupForm.value);
  }

  createUser(){
    // let userData: User = {
    //   first_name: this.signupForm.controls.firstName.value,
    //   last_name: this.signupForm.controls.lastName.value,
    //   location: this.signupForm.controls.location.value,
    //   about: this.signupForm.controls.about.value,
    //   photo: "",
    // }

    // TODO:
    // post user
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
