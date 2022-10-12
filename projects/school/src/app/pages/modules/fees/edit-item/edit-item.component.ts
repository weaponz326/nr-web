import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  constructor() { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  itemFormData: any;

  isSaving = false;
  budgetData: any;

  editItemForm = new FormGroup({
    itemNumber: new FormControl(),
    itemName: new FormControl(''),
    amount: new FormControl('')
  })

  ngOnInit(): void {
  }

  openModal(item: any){
    this.itemFormData = item;

    this.editItemForm.controls.itemNumber.setValue(this.itemFormData.data().item_number);
    this.editItemForm.controls.itemName.setValue(this.itemFormData.data().item_description);
    this.editItemForm.controls.amount.setValue(this.itemFormData.data().amount);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    let data = {
      item_number: this.editItemForm.controls.itemNumber.value,
      item_description: this.editItemForm.controls.itemName.value,
      amount: this.editItemForm.controls.amount.value,
    }

    let item = {
      id: this.itemFormData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

}
