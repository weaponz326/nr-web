import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ChecklistFormComponent } from '../checklist-form/checklist-form.component'

import { Checklist } from 'projects/hotel/src/app/models/modules/housekeeping/housekeeping.model';


@Component({
  selector: 'app-add-checklist',
  templateUrl: './add-checklist.component.html',
  styleUrls: ['./add-checklist.component.scss']
})
export class AddChecklistComponent implements OnInit {

  constructor() { }

  @Output() saveChecklistEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('checklistFormComponentReference', { read: ChecklistFormComponent, static: false }) checklistForm!: ChecklistFormComponent;

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(lastId: any){
    console.log(lastId);
    this.checklistForm.checklistForm.controls.itemNumber.setValue(lastId + 1);

    this.addButton.nativeElement.click();
  }

  saveItem(){
    let data: Checklist = {
      housekeeping: sessionStorage.getItem('hotel_housekeeping_id') as string,
      item_number: this.checklistForm.checklistForm.controls.itemNumber.value as string,
      item_description: this.checklistForm.checklistForm.controls.itemDescription.value as string,
      item_status: this.checklistForm.checklistForm.controls.itemStatus.value as string,
      remarks: this.checklistForm.checklistForm.controls.remarks.value as string,
    }

    this.saveChecklistEvent.emit(data);
  }

  resetForm(){
    this.checklistForm.checklistForm.controls.itemNumber.setValue(null);
    this.checklistForm.checklistForm.controls.itemDescription.setValue('');
    this.checklistForm.checklistForm.controls.itemStatus.setValue('');
    this.checklistForm.checklistForm.controls.remarks.setValue('');
  }

}
