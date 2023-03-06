import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { BookedRoomsComponent } from '../booked-rooms/booked-rooms.component';

import { SelectGuestComponent } from '../../../../components/select-windows/guests-windows/select-guest/select-guest.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { BookingsApiService } from 'projects/hotel/src/app/services/modules-api/bookings-api/bookings-api.service';
// import { BookingsPrintService } from 'projects/hotel/src/app/services/modules-printing/bookings-print/bookings-print.service';

import { Booking } from 'projects/hotel/src/app/models/modules/bookings/bookings.model';


@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.scss']
})
export class ViewBookingComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private bookingsApi: BookingsApiService,
    // private bookingsPrint: BookingsPrintService
  ) { }

  @ViewChild('existButtonElementReference', { read: ElementRef, static: false }) existButtonElement!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('bookedRoomsComponentReference', { read: BookedRoomsComponent, static: false }) bookedRooms!: BookedRoomsComponent;

  @ViewChild('selectGuestComponentReference', { read: SelectGuestComponent, static: false }) selectGuest!: SelectGuestComponent;

  navHeading: any[] = [
    { text: "All Bookings", url: "/home/bookings/all-bookings" },
    { text: "View Booking", url: "/home/bookings/view-booking" },
  ];

  bookingFormData: any;

  isBookingLoading: boolean = false;
  isBookingSaving: boolean = false;
  isBookingDeleting: boolean = false;
  isBookinggDelivery: boolean = false;

  bookingForm = new FormGroup({
    bookingCode: new FormControl({value: '', disabled: true}),
    bookingDate: new FormControl(),
    guestCode: new FormControl({value: '', disabled: true}),
    guestName: new FormControl({value: '', disabled: true}),
    expectedArrival: new FormControl(),
    bookingStatus: new FormControl(''),
  })

  selectedGuestId = '';

  ngOnInit(): void {
    this.getBooking();
  }

  getBooking(){
    this.isBookingLoading = true;

    this.bookingsApi.getBooking()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.bookingFormData = res;
          this.isBookingLoading = false;

          this.bookingForm.controls.bookingCode.setValue(this.bookingFormData.booking_code);
          this.bookingForm.controls.bookingDate.setValue(new Date(this.bookingFormData.booking_date).toISOString().slice(0, 16));
          this.bookingForm.controls.expectedArrival.setValue(new Date(this.bookingFormData.expected_arrival).toISOString().slice(0, 16));
          this.bookingForm.controls.bookingStatus.setValue(this.bookingFormData.booking_status);

          this.selectedGuestId = this.bookingFormData.guest?.id;
          this.bookingForm.controls.guestCode.setValue(this.bookingFormData.guest?.guest_code)
          this.bookingForm.controls.guestName.setValue(this.bookingFormData.guest?.guest_name)
        },
        error: (err) => {
          console.log(err);
          this.isBookingLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putBooking(){
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

    this.bookingsApi.putBooking(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isBookingSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isBookingSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteBooking(){
    this.isBookingDeleting = true;

    this.bookingsApi.deleteBooking()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.router.navigateByUrl('/home/bookings/all-bookings');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  openGuestWindow(){
    console.log("You are opening select guest window")
    this.selectGuest.openModal();
  }

  onGuestSelected(guestData: any){
    console.log(guestData);

    this.selectedGuestId = guestData.id;
    this.bookingForm.controls.guestName.setValue(guestData.guest_name);
    this.bookingForm.controls.guestCode.setValue(guestData.guest_code);
  }

  onPrint(){
    console.log("lets start printing...");
    // this.bookingsPrint.printViewBooking();
  }

  onPrintRoll(){
    console.log("lets start printing roll...");
    // this.bookingsPrint.printBookingRoll();
  }
  
}
