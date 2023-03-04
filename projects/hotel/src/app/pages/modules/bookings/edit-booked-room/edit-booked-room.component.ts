import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { BookedRoomFormComponent } from '../booked-room-form/booked-room-form.component'

import { BookedRoom } from 'projects/hotel/src/app/models/modules/bookings/bookings.model';


@Component({
  selector: 'app-edit-booked-room',
  templateUrl: './edit-booked-room.component.html',
  styleUrls: ['./edit-booked-room.component.scss']
})
export class EditBookedRoomComponent implements OnInit {

  constructor() { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('bookedRoomFormComponentReference', { read: BookedRoomFormComponent, static: false }) bookedRoomForm!: BookedRoomFormComponent;

  bookingItemData: any;

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.bookingItemData = data;

    this.bookedRoomForm.bookedRoomForm.controls.roomNumber.setValue(data.room.room_number);
    this.bookedRoomForm.bookedRoomForm.controls.roomNumber.setValue(data.room.room_type);
    this.bookedRoomForm.bookedRoomForm.controls.rate.setValue(data.room.rate);
    this.bookedRoomForm.bookedRoomForm.controls.personsNumber.setValue(data.persons_number);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    let data: BookedRoom = {
      booking: sessionStorage.getItem('hotel_booking_id') as string,
      room: this.bookedRoomForm.selectedRoomId,
      persons_number: this.bookedRoomForm.bookedRoomForm.controls.personsNumber.value as number,
    }

    let item = {
      id: this.bookingItemData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

}
