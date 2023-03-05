import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit {

  constructor() { }

  @Output() openProductWindow = new EventEmitter<any>();

  selectedProductId = "";
  selectedProductData = "";

  inventoryForm = new FormGroup({
    inventoryCode: new FormControl(''),
    productName: new FormControl({value: '', disabled: true}),
    productCode: new FormControl({value: '', disabled: true}),
    unitPrice: new FormControl({value: 0.00, disabled: true}),
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
