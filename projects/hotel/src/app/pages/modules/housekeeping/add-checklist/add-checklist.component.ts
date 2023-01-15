import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ChecklistFormComponent } from '../checklist-form/checklist-form.component'

// import { ChecklistItem } from 'projects/hotel/src/app/models/modules/housekeepings/housekeepings.model';


@Component({
  selector: 'app-add-checklist',
  templateUrl: './add-checklist.component.html',
  styleUrls: ['./add-checklist.component.scss']
})
export class AddChecklistComponent implements OnInit {

  constructor() { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('checklistFormComponentReference', { read: ChecklistFormComponent, static: false }) checklistForm!: ChecklistFormComponent;

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(lastId: any){
    this.checklistForm.checklistForm.controls.itemNumber.setValue(lastId + 1);

    this.addButton.nativeElement.click();
  }

  saveItem(){
    // let data: ChecklistItem = {
    let data = {
      housekeeping: sessionStorage.getItem('hotel_housekeeping_id') as string,
      item_number: this.checklistForm.checklistForm.controls.itemNumber.value as number,
      item_description: this.checklistForm.checklistForm.controls.itemDescription.value as string,
      item_status: this.checklistForm.checklistForm.controls.itemStatus.value as string,
      remarks: this.checklistForm.checklistForm.controls.remarks.value as string,
    }

    this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.checklistForm.checklistForm.controls.itemNumber.setValue(null);
    this.checklistForm.checklistForm.controls.itemDescription.setValue('');
    this.checklistForm.checklistForm.controls.itemStatus.setValue('');
    this.checklistForm.checklistForm.controls.remarks.setValue('');
  }

}
