import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  constructor() { }

  @Output() openMenuItemWindow = new EventEmitter<any>();

  selectedMenuItemId = "";
  selectedMenuItemData: any;

  itemForm = new FormGroup({
    itemNumber: new FormControl(),
    menuItem: new FormControl({value: "", disabled: true}),
    price: new FormControl({value: 0, disabled: true}),
    quantity: new FormControl(1)
  })

  ngOnInit(): void {
  }  

}
