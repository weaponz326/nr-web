import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.scss']
})
export class TwoFactorAuthComponent implements OnInit {

  constructor() { }

  isTfaSending = false;
  isTfaEnabled = false;

  tfaForm = new FormGroup({
    phone: new FormControl({value: "", disabled: true}),
  })

  ngOnInit(): void {
  }

  // TODO:
  // submit form

  disablePhone(e: any){
    console.log(e);

    if(e.target.checked){
      this.tfaForm.controls.phone.enable();
      this.isTfaEnabled = true;
    }
    else{
      this.tfaForm.controls.phone.disable();
      this.isTfaEnabled = false;
    }
  }

}
