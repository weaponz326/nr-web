import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  constructor() { }

  @Output() openProductWindow = new EventEmitter<any>();

  selectedProductId = "";
  selectedProductData: any;

  itemForm = new FormGroup({
    itemNumber: new FormControl(),
    productCode: new FormControl({value: "", disabled: true}),
    productName: new FormControl({value: "", disabled: true}),
    price: new FormControl({value: 0, disabled: true}),
    quantity: new FormControl(1)
  })

  ngOnInit(): void {
  }  

}
