import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-receivable-form',
  templateUrl: './receivable-form.component.html',
  styleUrls: ['./receivable-form.component.scss']
})
export class ReceivableFormComponent implements OnInit {

  constructor() { }

  receivableForm = new FormGroup({
    receivableCode: new FormControl(''),
    receivableDate: new FormControl(),
    dueDate: new FormControl(),
    invoiceNumber: new FormControl(''),
    customerName: new FormControl(''),
    amount: new FormControl(0.00),
    dateReceived: new FormControl(),
  })

  ngOnInit(): void {
  }

}
