import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ChecklistFormComponent } from '../checklist-form/checklist-form.component'

import { Checklist } from 'projects/hotel/src/app/models/modules/housekeeping/housekeeping.model';


@Component({
  selector: 'app-edit-checklist',
  templateUrl: './edit-checklist.component.html',
  styleUrls: ['./edit-checklist.component.scss']
})
export class EditChecklistComponent implements OnInit {

  constructor() { }

  @Output() saveChecklistEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('checklistFormComponentReference', { read: ChecklistFormComponent, static: false }) checklistForm!: ChecklistFormComponent;

  checklistItemData: any;

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.checklistItemData = data;

    this.checklistForm.checklistForm.controls.itemNumber.setValue(data.item_number);
    this.checklistForm.checklistForm.controls.itemDescription.setValue(data.item_description);
    this.checklistForm.checklistForm.controls.itemStatus.setValue(data.item_status);
    this.checklistForm.checklistForm.controls.remarks.setValue(data.remarks);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    let data: Checklist = {
      housekeeping: sessionStorage.getItem('hotel_housekeeping_id') as string,
      item_number: this.checklistForm.checklistForm.controls.itemNumber.value as string,
      item_description: this.checklistForm.checklistForm.controls.itemDescription.value as string,
      item_status: this.checklistForm.checklistForm.controls.itemStatus.value as string,
      remarks: this.checklistForm.checklistForm.controls.remarks.value as string,
    }

    let item = {
      id: this.checklistItemData.id,
      data: data
    }

    this.saveChecklistEvent.emit(item);
  }

}
