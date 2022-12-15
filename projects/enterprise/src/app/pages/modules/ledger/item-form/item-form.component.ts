import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  constructor() { }

  itemForm = new FormGroup({
    itemDate: new FormControl(),
    referenceNumber: new FormControl(''),
    description: new FormControl(''),
    itemType: new FormControl(''),
    amount: new FormControl(0)
  })

  ngOnInit(): void {
  }

}
