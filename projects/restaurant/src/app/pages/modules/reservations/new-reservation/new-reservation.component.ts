import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectCustomerComponent } from '../../../../components/select-windows/customers-windows/select-customer/select-customer.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';
import { ReservationsApiService } from 'projects/restaurant/src/app/services/modules-api/reservations-api/reservations-api.service';

import { Reservation } from 'projects/restaurant/src/app/models/modules/reservations/reservations.model';


@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.scss']
})
export class NewReservationComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private reservationsApi: ReservationsApiService
  ) { }

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('selectCustomerComponentReference', { read: SelectCustomerComponent, static: false }) selectCustomer!: SelectCustomerComponent;

  selectedCustomerId = "";
  selectedCustomerName = "";

  isReservationSaving = false;

  reservationForm = new FormGroup({
    reservationCode: new FormControl(''),
    reservationDate: new FormControl(),
    customerName: new FormControl(''),
    arrivalDate: new FormControl(),
    status: new FormControl(''),
  })

  ngOnInit(): void {
  }

  openModal(){
    this.addButton.nativeElement.click();
    this.reservationForm.controls.reservationDate.setValue(new Date().toISOString().slice(0, 16));
    this.getNewreservationCodeConfig();
  }

  createReservation(){
    let data: Reservation = {
      account: this.customCookie.getCookie('restaurant_id') as string,
      customer: this.selectedCustomerId,
      customer_name: this.reservationForm.controls.customerName.value as string,
      reservation_code: this.reservationForm.controls.reservationCode.value as string,
      reservation_date: this.reservationForm.controls.reservationDate.value,
      number_guests: null,
      number_tables: null,
      arrival_date: this.reservationForm.controls.arrivalDate.value,
      status: this.reservationForm.controls.status.value as string,
    }

    this.isReservationSaving = true;

    this.reservationsApi.postReservation(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem('restaurant_reservation_id', res.id);
          this.router.navigateByUrl('/home/reservations/view-reservation');
          this.dismissButton.nativeElement.click();
          this.isReservationSaving = true;
        },
        error: (err) => {
          console.log(err);
          this.isReservationSaving = true;
          this.connectionToast.openToast();
        }
      })
  }

  getNewreservationCodeConfig(){
    this.reservationForm.controls.reservationCode.disable();

    this.reservationsApi.getNewReservationCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code)
            this.reservationForm.controls.reservationCode.setValue(res.code);
          else
            this.reservationForm.controls.reservationCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  openCustomerWindow(){
    console.log("You are opening select customer window")
    this.selectCustomer.openModal();
  }

  onCustomerSelected(customerData: any){
    console.log(customerData);

    this.selectedCustomerId = customerData.id;
    this.selectedCustomerName = customerData.customer_name;
    this.reservationForm.controls.customerName.setValue(customerData.customer_name);
  }

}
