import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GuestFormComponent } from '../guest-form/guest-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { GuestsApiService } from 'projects/hotel/src/app/services/modules-api/guests-api/guests-api.service';

import { Guest } from 'projects/hotel/src/app/models/modules/guests/guests.model';


@Component({
  selector: 'app-new-guest',
  templateUrl: './new-guest.component.html',
  styleUrls: ['./new-guest.component.scss']
})
export class NewGuestComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private guestsApi: GuestsApiService
  ) { }

  @ViewChild('guestFormComponentReference', { read: GuestFormComponent, static: false }) guestForm!: GuestFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Guest", url: "/home/guests/new-guest" },
  ];

  isGuestSaving = false;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getNewGuestCodeConfig();
  }

  createGuest(){
    console.log('u are saving a new guest');

    let data: Guest = {
      account: this.customCookie.getCookie('hotel_id') as string,
      guest_code: this.guestForm.guestForm.controls.guestCode.value as string,
      guest_name: this.guestForm.guestForm.controls.guestName.value as string,
      guest_type: this.guestForm.guestForm.controls.guestType.value as string,
      phone: this.guestForm.guestForm.controls.phone.value as string,
      email: this.guestForm.guestForm.controls.email.value as string,
      address: this.guestForm.guestForm.controls.address.value as string,
      state: this.guestForm.guestForm.controls.state.value as string,
      city: this.guestForm.guestForm.controls.city.value as string,
    }

    console.log(data);
    this.isGuestSaving = true;

    this.guestsApi.postGuest(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isGuestSaving = false;

          sessionStorage.setItem('hotel_guest_id', res.id);
          this.router.navigateByUrl('/home/guests/view-guest');
        },
        error: (err) => {
          console.log(err);
          this.isGuestSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  getNewGuestCodeConfig(){
    this.guestsApi.getNewGuestCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code){
            this.guestForm.guestForm.controls.guestCode.setValue(res.code);
            this.guestForm.guestForm.controls.guestCode.disable();
          }
          else{
            this.guestForm.guestForm.controls.guestCode.enable();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
