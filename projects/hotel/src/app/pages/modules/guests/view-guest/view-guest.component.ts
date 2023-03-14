import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GuestFormComponent } from '../guest-form/guest-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { GuestsApiService } from 'projects/hotel/src/app/services/modules-api/guests-api/guests-api.service';
// import { GuestsPrintService } from 'projects/hotel/src/app/services/modules-printing/guests-print/guests-print.service';

import { Guest } from 'projects/hotel/src/app/models/modules/guests/guests.model';


@Component({
  selector: 'app-view-guest',
  templateUrl: './view-guest.component.html',
  styleUrls: ['./view-guest.component.scss']
})
export class ViewGuestComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private guestsApi: GuestsApiService,
    // private guestsPrint: GuestsPrintService,
  ) { }

  @ViewChild('guestFormComponentReference', { read: GuestFormComponent, static: false }) guestForm!: GuestFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Guests", url: "/home/guests/all-guests" },
    { text: "View Guest", url: "/home/guests/view-guest" },
  ];

  guestData: any;

  isGuestLoading = false;
  isGuestSaving = false;
  isGuestDeleting = false;

  ngOnInit(): void {
    this.getGuest();
    this.getGuestCodeConfig();
  }

  getGuest(){
    this.isGuestLoading = true;

    this.guestsApi.getGuest()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.guestData = res;
          this.isGuestLoading = false;

          this.guestForm.guestForm.controls.guestCode.setValue(this.guestData.guest_code);
          this.guestForm.guestForm.controls.guestName.setValue(this.guestData.guest_name);
          this.guestForm.guestForm.controls.guestType.setValue(this.guestData.guest_type);
          this.guestForm.guestForm.controls.phone.setValue(this.guestData.phone);
          this.guestForm.guestForm.controls.email.setValue(this.guestData.email);
          this.guestForm.guestForm.controls.address.setValue(this.guestData.address);
          this.guestForm.guestForm.controls.state.setValue(this.guestData.state);
          this.guestForm.guestForm.controls.city.setValue(this.guestData.city);
       },
        error: (err) => {
          console.log(err);
          this.isGuestLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putGuest(){
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

    this.guestsApi.putGuest(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isGuestSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isGuestSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteGuest(){
    this.isGuestDeleting = true;

    this.guestsApi.deleteGuest()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/guests/all-guests');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getGuestCodeConfig(){
    this.guestsApi.getGuestCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.entry_mode == "Auto")
            this.guestForm.guestForm.controls.guestCode.disable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
  
  onPrint(){
    console.log("lets start printing...");
    // this.guestsPrint.printViewGuest();
  }

}
