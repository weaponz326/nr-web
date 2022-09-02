import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountApiService } from '../../services/account-api/account-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  constructor(
    private router: Router,
    private accountApi: AccountApiService
  ) { }

  accountForm = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    about: new FormControl('', Validators.required),
  })

  saved: boolean = false;
  isSending: boolean = false;
  showPrompt: boolean = false;

  nameErrors: any;
  locErrors: any;
  abtErrors: any;
  nfErrors: any;

  ngOnInit(): void {
  }

  onSubmit(){
    let personalData: any = {
      personal_id: localStorage.getItem('personal_id'),
      personal_name: sessionStorage.getItem('personal_name')
    }

    let mergedData = Object.assign(this.accountForm.value, personalData);
    console.log(mergedData);

    this.isSending = true;
    this.saved = true;

    this.accountApi.postAccount(mergedData)
      .subscribe({
        next: (res) => {
          console.log(res);
          if(res.message == "OK"){
            this.showPrompt = true;
            localStorage.setItem('restaurant_id', res.data.id);
          }

          // // TODO: implement with receivers at backend
          // this.createAccountUser(accountData);
          // this.createExtendedProfile();
          // this.createSubscription();

          this.isSending = false;
        },
        error: (err) => {
          console.log(err);
          this.nameErrors = err.errors.name;
          this.locErrors = err.errors.location;
          this.abtErrors = err.errors.about;
          this.nfErrors = err.errors.nfErrors;

          this.isSending = false;
        }
      })

    console.log(this.accountForm.value);
  }

  onAddressChange(address: any) {
    this.accountForm.controls.location.setValue(address.formatted_address);
    console.log(address);
  }

}
