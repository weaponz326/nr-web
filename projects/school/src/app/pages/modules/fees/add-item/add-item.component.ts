import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// import { FeesItem } from 'projects/school/src/app/models/modules/fees/fees.model';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  constructor() { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  feesData: any;

  isSaving = false;

  addItemForm = new FormGroup({
    itemNumber: new FormControl(''),
    itemName: new FormControl(''),
    amount: new FormControl(0)
  })

  ngOnInit(): void {
  }

  openModal(){
    this.addItemForm.controls.amount.setValue(0.00);
    this.addButton.nativeElement.click();
  }

  saveItem(){
    // let data: FeesItem = {
    //   fees: sessionStorage.getItem('school_fees_id') as string,
    //   item_number: this.addItemForm.controls.itemNumber.value,
    //   item_name: this.addItemForm.controls.itemName.value,
    //   amount: this.addItemForm.controls.amount.value,
    // }

    // this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.addItemForm.controls.itemNumber.setValue('');
    this.addItemForm.controls.itemName.setValue('');
    this.addItemForm.controls.amount.setValue(0);
  }

}
