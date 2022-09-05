import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Batch } from 'projects/restaurant/src/app/models/modules/roster/roster.model';


@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.scss']
})
export class AddBatchComponent implements OnInit {

  constructor() { }

  @Output() saveBatchEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  isSaving = false;

  batchForm = new FormGroup({
    batchName: new FormControl(''),
    batchSymbol: new FormControl(''),
  })

  ngOnInit(): void {
  }

  openModal(){
    this.addButton.nativeElement.click();
  }

  saveBatch(){
    let data: Batch = {
      roster: sessionStorage.getItem('restaurant_roster_id') as string,
      batch_name: this.batchForm.controls.batchName.value as string,
      batch_symbol: this.batchForm.controls.batchSymbol.value as string,
    }
    this.saveBatchEvent.emit(data);
  }

  resetForm(){
    this.batchForm.controls.batchName.setValue('');
    this.batchForm.controls.batchSymbol.setValue('');
  }

}
