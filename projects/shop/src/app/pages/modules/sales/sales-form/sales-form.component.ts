import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.scss']
})
export class SalesFormComponent implements OnInit {

  constructor() { }

  salesForm = new FormGroup({
    salesCode: new FormControl(''),
    salesDate: new FormControl(),
    productCode: new FormControl(''),
    productName: new FormControl(''),
    unitPrice: new FormControl(0.00),
    quantity: new FormControl(1),
    totalPrice: new FormControl(0.00),
    customerName: new FormControl(''),
  })

  ngOnInit(): void {
  }

}
