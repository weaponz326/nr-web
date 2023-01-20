import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { BookedRoomFormComponent } from '../booked-room-form/booked-room-form.component'

import { BookedRoom } from 'projects/hotel/src/app/models/modules/bookings/bookings.model';


@Component({
  selector: 'app-add-booked-room',
  templateUrl: './add-booked-room.component.html',
  styleUrls: ['./add-booked-room.component.scss']
})
export class AddBookedRoomComponent implements OnInit {

  constructor() { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('bookedRoomFormComponentReference', { read: BookedRoomFormComponent, static: false }) bookedRoomForm!: BookedRoomFormComponent;

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(){
    this.addButton.nativeElement.click();
  }

  saveItem(){
    let data: BookedRoom = {
      booking: sessionStorage.getItem('hotel_booking_id') as string,
      room: this.bookedRoomForm.selectedRoomId,
      persons_number: this.bookedRoomForm.bookedRoomForm.controls.personsNumber.value as number,
    }

    this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.bookedRoomForm.bookedRoomForm.controls.roomNumber.setValue('');
    this.bookedRoomForm.bookedRoomForm.controls.roomType.setValue('');
    this.bookedRoomForm.bookedRoomForm.controls.rate.setValue(0.00);
    this.bookedRoomForm.bookedRoomForm.controls.personsNumber.setValue(1);
  }

}
