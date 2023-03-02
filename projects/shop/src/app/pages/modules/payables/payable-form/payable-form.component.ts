import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-payable-form',
  templateUrl: './payable-form.component.html',
  styleUrls: ['./payable-form.component.scss']
})
export class PayableFormComponent implements OnInit {

  constructor() { }

  payableForm = new FormGroup({
    payableCode: new FormControl(''),
    payableDate: new FormControl(),
    dueDate: new FormControl(),
    invoiceNumber: new FormControl(''),
    customerName: new FormControl(''),
    amount: new FormControl(0.00),
    datePaid: new FormControl(),
  })

  ngOnInit(): void {
  }

}
