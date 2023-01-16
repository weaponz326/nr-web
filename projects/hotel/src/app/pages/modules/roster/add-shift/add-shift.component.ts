import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// import { Shift } from 'projects/hotel/src/app/models/modules/roster/roster.model';


@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss']
})
export class AddShiftComponent implements OnInit {

  constructor() { }

  @Output() saveShiftEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  isSaving = false;

  shiftForm = new FormGroup({
    shiftName: new FormControl(''),
    startTime: new FormControl(),
    endTime: new FormControl(),
  })

  ngOnInit(): void {
  }

  openModal(){
    this.addButton.nativeElement.click();
  }

  saveShift(){
    // let data: Shift = {
    let data = {
      roster: sessionStorage.getItem('hotel_roster_id') as string,
      shift_name: this.shiftForm.controls.shiftName.value as string,
      start_time: this.shiftForm.controls.startTime.value,
      end_time: this.shiftForm.controls.endTime.value,
    }

    this.saveShiftEvent.emit(data);
  }

  resetForm(){
    this.shiftForm.controls.shiftName.setValue('');
    this.shiftForm.controls.startTime.setValue(null);
    this.shiftForm.controls.endTime.setValue(null);
  }

}
