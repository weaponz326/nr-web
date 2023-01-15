import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-checkin-form',
  templateUrl: './checkin-form.component.html',
  styleUrls: ['./checkin-form.component.scss']
})
export class CheckinFormComponent implements OnInit {

  constructor() { }

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
  
  bookingDisabled = true;

  ngOnInit(): void {
  }

  onBookingCheckChanged(e: any){
    console.log(e.target.results);

    if (e.target.results = true){
      this.bookingDisabled = false;
    }
    else{
      this.bookingDisabled = true;
    }
  }

}
