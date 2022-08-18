import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html',
  styleUrls: ['./recovery-form.component.scss']
})
export class RecoveryFormComponent implements OnInit {

  constructor() { }

  authError = "";

  saved: boolean = false;
  isSending: boolean = false;
  showPrompt: boolean = false;

  recoveryForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  ngOnInit(): void {
  }

  onSubmit(){
    this.saved = true;

    if (this.recoveryForm.valid){
      this.isSending = true;

      // TODO:
      // post recovery mail
    }
    else{
      console.log("form is invalid");
    }
  }

}
