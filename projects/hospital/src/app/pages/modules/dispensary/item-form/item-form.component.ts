import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  constructor() { }

  @Output() openDrugWindow = new EventEmitter<any>();

  itemForm = new FormGroup({
    itemNumber: new FormControl(),
    drugName: new FormControl({value: '', disabled: true}),
    ndcNumber: new FormControl({value: '', disabled: true}),
    remarks: new FormControl('')
  })

  ngOnInit(): void {
  }

}
