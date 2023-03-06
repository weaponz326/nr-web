import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SelectGuestComponent } from '../../../../components/select-windows/guests-windows/select-guest/select-guest.component';
import { SelectBookingComponent } from '../../../../components/select-windows/bookings-windows/select-booking/select-booking.component';
import { SelectRoomComponent } from '../../../../components/select-windows/rooms-windows/select-room/select-room.component';


@Component({
  selector: 'app-checkin-form',
  templateUrl: './checkin-form.component.html',
  styleUrls: ['./checkin-form.component.scss']
})
export class CheckinFormComponent implements OnInit {

  constructor() { }

  @ViewChild('selectGuestComponentReference', { read: SelectGuestComponent, static: false }) selectGuest!: SelectGuestComponent;
  @ViewChild('selectBookingComponentReference', { read: SelectBookingComponent, static: false }) selectBooking!: SelectBookingComponent;
  @ViewChild('selectRoomComponentReference', { read: SelectRoomComponent, static: false }) selectRoom!: SelectRoomComponent;
  
  checkinForm = new FormGroup({
    checkinCode: new FormControl(''),
    guestCode: new FormControl({ value: '', disabled: true }),
    guestName: new FormControl({ value: '', disabled: true }),
    checkinDate: new FormControl(),
    checkoutDate: new FormControl(),
    fromBooking: new FormControl(),
    bookingCode: new FormControl({ value: '', disabled: true }),
    roomNumber: new FormControl({ value: '', disabled: true }),
    numberNights: new FormControl(''),
  });
  
  selectedGuestId = '';
  selectedBookingId = '';
  selectedRoomId = '';

  isBookingDisabled = true;
  isGuestDisabled = false;

  ngOnInit(): void {
  }

  onBookingCheckChanged(e: any){
    console.log(e.target.checked);
    console.log(e);

    if (e.target.checked == true){
      this.isBookingDisabled = false;
      this.isGuestDisabled = true;

      this.checkinForm.controls.guestCode.setValue('');
      this.checkinForm.controls.guestName.setValue('');
    }
    else{
      this.isBookingDisabled = true;
      this.isGuestDisabled = false;

      this.checkinForm.controls.bookingCode.setValue('');
    }
  }

  openGuestWindow(){
    console.log("You are opening select guest window")
    this.selectGuest.openModal();
  }

  onGuestSelected(guestData: any){
    console.log(guestData);

    this.selectedGuestId = guestData.id;
    this.checkinForm.controls.guestName.setValue(guestData.guest_name);
    this.checkinForm.controls.guestCode.setValue(guestData.guest_code);
  }

  openBookingWindow(){
    console.log("You are opening select booking window")
    this.selectBooking.openModal();
  }

  onBookingSelected(bookingData: any){
    console.log(bookingData);

    this.selectedBookingId = bookingData.id;
    this.checkinForm.controls.bookingCode.setValue(bookingData.booking_code);
    this.checkinForm.controls.guestName.setValue(bookingData.guest?.guest_name);
    this.checkinForm.controls.guestCode.setValue(bookingData.guest?.guest_code);
  }

  openRoomWindow(){
    console.log("You are opening select room window")
    this.selectRoom.openModal();
  }

  onRoomSelected(roomData: any){
    console.log(roomData);

    this.selectedRoomId = roomData.id;
    this.checkinForm.controls.roomNumber.setValue(roomData.room_number);
  }

}
