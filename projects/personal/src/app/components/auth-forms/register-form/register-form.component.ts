import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  constructor() { }

  @Input() suiteName: any;
  @Input() showPrompt: any;
  @Input() isSending: any;
  @Input() errors: any;
  @Output() submitEvent = new EventEmitter<any>;

  accountForm = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    about: new FormControl('', Validators.required),
  })
  
  formHeading = "";

  ngOnInit(): void {
    this.formHeading = this.suiteName + " register";
  }

  onSubmit(){
    let personalData: any = {
      creator_id: localStorage.getItem('personal_id'),
      creator_name: sessionStorage.getItem('personal_name')
    }

    let mergedData = Object.assign(this.accountForm.value, personalData);
    this.submitEvent.emit(mergedData);

    console.log(mergedData);
  }

  onAddressChange(address: any) {
    this.accountForm.controls.location.setValue(address.formatted_address);
    console.log(address);
  }

}
