import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-receivable-form',
  templateUrl: './receivable-form.component.html',
  styleUrls: ['./receivable-form.component.scss']
})
export class ReceivableFormComponent implements OnInit {

  constructor() { }

  @Output() openCustomerWindow = new EventEmitter<any>();

  selectedCustomerId = "";
  selectedCustomerData = "";

  receivableForm = new FormGroup({
    receivableCode: new FormControl(''),
    receivableDate: new FormControl(),
    dueDate: new FormControl(),
    invoiceNumber: new FormControl(''),
    customerName: new FormControl({value: '', disabled: true}),
    amount: new FormControl(0.00),
    dateReceived: new FormControl(),
  })

  ngOnInit(): void {
  }

}
