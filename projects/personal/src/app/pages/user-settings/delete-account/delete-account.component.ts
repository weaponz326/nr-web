import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {

  constructor() { }

  isDeleteSending = false;

  deleteForm = new FormGroup({
    password: new FormControl(''),
  })

  ngOnInit(): void {
  }

  // TODO:
  // submit form

}
