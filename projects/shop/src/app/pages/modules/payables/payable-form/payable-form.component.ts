import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-payable-form',
  templateUrl: './payable-form.component.html',
  styleUrls: ['./payable-form.component.scss']
})
export class PayableFormComponent implements OnInit {

  constructor() { }

  @Output() openSupplierWindow = new EventEmitter<any>();

  selectedSupplierId = "";
  selectedSupplierData = "";
  
  payableForm = new FormGroup({
    payableCode: new FormControl(''),
    payableDate: new FormControl(),
    dueDate: new FormControl(),
    invoiceNumber: new FormControl(''),
    supplierName: new FormControl({value: '', disabled: true}),
    amount: new FormControl(0.00),
    datePaid: new FormControl(),
  })

  ngOnInit(): void {
  }

}
