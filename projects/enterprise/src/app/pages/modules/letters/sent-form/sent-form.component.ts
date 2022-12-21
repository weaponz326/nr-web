import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-sent-form',
  templateUrl: './sent-form.component.html',
  styleUrls: ['./sent-form.component.scss']
})
export class SentFormComponent implements OnInit {

  constructor() { }

  sentForm = new FormGroup({
    dateSent: new FormControl(),
    referenceNumber: new FormControl(''),
    recepient: new FormControl(''),
    subject: new FormControl('')
  })

  ngOnInit(): void {
  }

}
