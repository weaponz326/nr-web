import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CheckinFormComponent } from '../checkin-form/checkin-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { CheckinApiService } from 'projects/hotel/src/app/services/modules-api/checkin-api/checkin-api.service';

// import { Checkin } from 'projects/hotel/src/app/models/modules/checkin/checkin.model';


@Component({
  selector: 'app-view-checkin',
  templateUrl: './view-checkin.component.html',
  styleUrls: ['./view-checkin.component.scss']
})
export class ViewCheckinComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private checkinApi: CheckinApiService
  ) { }

  @ViewChild('checkinFormComponentReference', { read: CheckinFormComponent, static: false }) checkinForm!: CheckinFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Checkin", url: "/home/checkin/all-checkin" },
    { text: "View Checkin", url: "/home/checkin/view-checkin" },
  ];

  checkinData: any;

  isCheckinLoading = false;
  isCheckinSaving = false;
  isCheckinDeleting = false;

  isActiveCheckinaving = false;

  ngOnInit(): void {
    this.getCheckin();
  }

  getCheckin(){
    this.isCheckinLoading = true;

    // this.checkinApi.getCheckin()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.checkinData = res;
    //       this.isCheckinLoading = false;

    //       this.checkinForm.checkinForm.controls.checkinCode.setValue(this.checkinData.checkin_code);
    //       this.checkinForm.checkinForm.controls.fromBooking.setValue(this.checkinData.from_booking);
    //       this.checkinForm.checkinForm.controls.bookingCode.setValue(this.checkinData.booking.booking_code);
    //       this.checkinForm.checkinForm.controls.guestCode.setValue(this.checkinData.guest.guest_code);
    //       this.checkinForm.checkinForm.controls.guestName.setValue(this.checkinData.guest.guest_name);
    //       this.checkinForm.checkinForm.controls.checkinDate.setValue(this.checkinData.checkin_date);
    //       this.checkinForm.checkinForm.controls.checkoutDate.setValue(this.checkinData.checkout_date);
    //       this.checkinForm.checkinForm.controls.numberNights.setValue(this.checkinData.number_nights);
    //       this.checkinForm.checkinForm.controls.roomNumber.setValue(this.checkinData.room.room_number);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isCheckinLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  updateCheckin(){
    console.log('u are saving a new checkin');

    // var data: Checkin = {
      var data = {
        account: this.customCookie.getCookie('hotel_id') as string,
        checkin_code: this.checkinForm.checkinForm.controls.checkinCode.value as string,
        from_booking: this.checkinForm.checkinForm.controls.fromBooking.value,
        booking_code: this.checkinForm.checkinForm.controls.bookingCode.value,
        checkin_date: this.checkinForm.checkinForm.controls.checkinDate.value,
        checkout_date: this.checkinForm.checkinForm.controls.checkoutDate.value as string,
        number_nights: this.checkinForm.checkinForm.controls.numberNights.value as string,
      }

    console.log(data);
    this.isCheckinSaving = true;

    // this.checkinApi.putCheckin(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isCheckinSaving = false;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isCheckinSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteCheckin(){
    this.isCheckinDeleting = true;

    // this.checkinApi.deleteCheckin()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/checkin/all-checkin');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   }) 
  }

  onPrint(){
    console.log("lets start printing...");
    // this.checkinPrint.printViewCheckin();
  }

}
