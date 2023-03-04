import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit {

  constructor() { }

  inventoryForm = new FormGroup({
    inventoryCode: new FormControl(''),
    productName: new FormControl(''),
    productCode: new FormControl(''),
    unitPrice: new FormControl(0.00),
    stock: new FormControl(0),
    refillOrdered: new FormControl(0),
    location: new FormControl(''),
    container: new FormControl(''),
    batchNumber: new FormControl(''),
    manufacturingDate: new FormControl(),
    expiryDate: new FormControl(),
  })
  
  ngOnInit(): void {
  }

}
