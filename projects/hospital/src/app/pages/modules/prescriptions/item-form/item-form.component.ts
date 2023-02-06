import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  constructor() { }

  itemForm = new FormGroup({
    itemNumber: new FormControl(),
    medicine: new FormControl(''),
    dosage: new FormControl(''),
    remarks: new FormControl('')
  })

  ngOnInit(): void {
  }

}
