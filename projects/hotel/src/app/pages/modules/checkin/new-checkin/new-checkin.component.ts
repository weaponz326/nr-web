import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CheckinFormComponent } from '../checkin-form/checkin-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { CheckinApiService } from 'projects/hotel/src/app/services/modules-api/checkin-api/checkin-api.service';

import { Checkin } from 'projects/hotel/src/app/models/modules/checkin/checkin.model';



@Component({
  selector: 'app-new-checkin',
  templateUrl: './new-checkin.component.html',
  styleUrls: ['./new-checkin.component.scss']
})
export class NewCheckinComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private checkinApi: CheckinApiService
  ) { }

  @ViewChild('checkinFormComponentReference', { read: CheckinFormComponent, static: false }) checkinForm!: CheckinFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;


  navHeading: any[] = [
    { text: "New Checkin", url: "/home/checkin/new-checkin" },
  ];

  isCheckinSaving = false;

  ngOnInit(): void {
    this.getNewCheckinCodeConfig();
  }

  ngAfterViewInit(): void {
    this.checkinForm.checkinForm.controls.checkinDate.setValue(new Date().toISOString().slice(0, 16));
  }

  postCheckin(){
    console.log('u are saving a new checkin');

    var data: Checkin = {
      account: this.customCookie.getCookie('hotel_id') as string,
      guest: this.checkinForm.selectedGuestId,
      room: this.checkinForm.selectedRoomId,
      checkin_code: this.checkinForm.checkinForm.controls.checkinCode.value as string,
      from_booking: this.checkinForm.checkinForm.controls.fromBooking.value,
      booking_code: this.checkinForm.checkinForm.controls.bookingCode.value as string,
      checkin_date: this.checkinForm.checkinForm.controls.checkinDate.value,
      checkout_date: this.checkinForm.checkinForm.controls.checkoutDate.value,
      number_nights: this.checkinForm.checkinForm.controls.numberNights.value as string,
    }

    console.log(data);
    this.isCheckinSaving = true;

    this.checkinApi.postCheckin(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isCheckinSaving = false;

          sessionStorage.setItem('hotel_checkin_id', res.id);
          this.router.navigateByUrl('/home/checkin/view-checkin');
        },
        error: (err) => {
          console.log(err);
          this.isCheckinSaving = false;
          this.connectionToast.openToast();
        }
      })    
  }

  getNewCheckinCodeConfig(){
        
  }

}
