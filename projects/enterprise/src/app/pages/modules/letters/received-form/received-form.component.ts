import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-received-form',
  templateUrl: './received-form.component.html',
  styleUrls: ['./received-form.component.scss']
})
export class ReceivedFormComponent implements OnInit {

  constructor() { }

  receivedForm = new FormGroup({
    dateReceived: new FormControl(),
    referenceNumber: new FormControl(''),
    sender: new FormControl(''),
    subject: new FormControl('')
  })
  
  ngOnInit(): void {
  }

}
