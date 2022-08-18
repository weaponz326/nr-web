import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor() { }

  isResetSending = false;

  resetForm = new FormGroup({
    oldPassword: new FormControl(''),
    password1: new FormControl(''),
    password2: new FormControl(''),
  })

  ngOnInit(): void {
  }

  // TODO:
  // submit form

}
