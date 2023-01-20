import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { BookingsApiService } from 'projects/hotel/src/app/services/modules-api/bookings-api/bookings-api.service';

import { Booking } from 'projects/hotel/src/app/models/modules/bookings/bookings.model';


@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss']
})
export class AddBookingComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private bookingsApi: BookingsApiService,
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isBookingSaving = false;

  bookingForm = new FormGroup({
    bookingCode: new FormControl(''),
    bookingDate: new FormControl(),
    guestCode: new FormControl({value: '', disabled: true}),
    guestName: new FormControl({value: '', disabled: true}),
    expectedArrival: new FormControl(),
    bookingStatus: new FormControl(''),
  })

  selectedGuestId = '';

  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.bookingForm.controls.bookingDate.setValue(new Date().toISOString().slice(0, 16));
    this.getNewBookingCodeConfig();
  }

  createBooking(){
    let data: Booking = {
      account: this.customCookie.getCookie('hotel_id') as string,
      guest: this.selectedGuestId,
      booking_code: this.bookingForm.controls.bookingCode.value as string,
      booking_date: this.bookingForm.controls.bookingDate.value,
      expected_arrival: this.bookingForm.controls.expectedArrival.value,
      booking_status: this.bookingForm.controls.bookingStatus.value as string,
    }

    console.log(data);
    this.isBookingSaving = true;

    this.bookingsApi.postBooking(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('hotel_booking_id', res.id);

            this.dismissButton.nativeElement.click();
            this.isBookingSaving = false;
            this.router.navigateByUrl('/home/bookings/view-booking');
          }
        },
        error: (err) => {
          console.log(err);
          this.isBookingSaving = false;
          this.connectionToast.openToast();
        }
      })

    console.log(data);
  }

  getNewBookingCodeConfig(){
    this.bookingForm.controls.bookingCode.disable();

    this.bookingsApi.getNewBookingCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code)
            this.bookingForm.controls.bookingCode.setValue(res.code);
          else
            this.bookingForm.controls.bookingCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
  
}
