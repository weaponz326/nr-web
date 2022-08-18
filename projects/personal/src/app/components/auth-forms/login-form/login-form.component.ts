import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor() { }

  authError = "";

  saved: boolean = false;
  isSending: boolean = false;
  showPrompt: boolean = false;
  sendVerification: boolean = false;

  suiteRegistrationType: string = "";

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

    if (this.loginForm.valid){
      this.isSending = true;

      // TODO:
      // post login
    }
    else{
      console.log("form is invalid");
    }
  }

  registrationType(){
    if (this.suiteRegistrationType == "nR Personal" || this.suiteRegistrationType == "netRink"){
      window.location.href = "/";
    }
    else{
      if (sessionStorage.getItem("isSuiteRegistration") == "OK"){
        this.showPrompt = true;
      }
      else{
        window.location.href = "/";
      }

      sessionStorage.removeItem("isSuiteRegistration");
    }
  }

  registrationRedirect(){
    window.location.href = "/register";
  }

}
