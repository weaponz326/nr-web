import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { ReservationTablesComponent } from '../reservation-tables/reservation-tables.component';
import { SelectCustomerComponent } from '../../../../components/select-windows/customers-windows/select-customer/select-customer.component';

import { ReservationsApiService } from 'projects/restaurant/src/app/services/modules-api/reservations-api/reservations-api.service';
// import { ReservationsPrintService } from 'projects/restaurant/src/app/services/printing/reservations-print/reservations-print.service';

import { Reservation } from 'projects/restaurant/src/app/models/modules/reservations/reservations.model';


@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.scss']
})
export class ViewReservationComponent implements OnInit {

  constructor(
    private router: Router,
    private reservationsApi: ReservationsApiService,
    // private reservationsPrint: ReservationsPrintService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('reservationTablesComponentReference', { read: ReservationTablesComponent, static: false }) reservationTables!: ReservationTablesComponent;
  @ViewChild('selectCustomerComponentReference', { read: SelectCustomerComponent, static: false }) selectCustomer!: SelectCustomerComponent;

  navHeading: any[] = [
    { text: "All Reservations", url: "/home/reservations/all-reservations" },
    { text: "View Reservation", url: "/home/reservations/view-reservation" },
  ];

  reservationFormData: any;

  selectedCustomerId: any;
  selectedTableId: any;

  isReservationLoading: boolean = false;
  isReservationSaving: boolean = false;
  isReservationDeleting: boolean = false;

  reservationForm = new FormGroup({
    reservationCode: new FormControl(''),
    reservationDate: new FormControl(),
    customerName: new FormControl(''),
    arrivalDate: new FormControl(),
    numberGuests: new FormControl(),
    numberTables: new FormControl(),
    status: new FormControl(''),
  })

  ngOnInit(): void {
    this.getReservation();
  }

  getReservation(){
    this.isReservationLoading = true;

    this.reservationsApi.getReservation()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.reservationFormData = res;
          this.isReservationLoading = false;

          this.reservationForm.controls.reservationCode.setValue(this.reservationFormData.reservation_code);
          this.reservationForm.controls.reservationDate.setValue(this.reservationFormData.reservation_date);
          this.reservationForm.controls.arrivalDate.setValue(this.reservationFormData.arrival_date);
          this.reservationForm.controls.status.setValue(this.reservationFormData.status);
          this.reservationForm.controls.numberGuests.setValue(this.reservationFormData.number_guests);
          this.reservationForm.controls.numberTables.setValue(this.reservationFormData.number_tables);

          this.selectedCustomerId = this.reservationFormData.customer.id;
          this.reservationForm.controls.customerName.setValue(this.reservationFormData.customer.customer_name);
        },
        error: (err) => {
          console.log(err);
          this.isReservationLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateReservation(){
    let data = {
      reservation_code: this.reservationForm.controls.reservationCode.value,
      reservation_date: this.reservationForm.controls.reservationDate.value,
      number_guests: this.reservationForm.controls.numberGuests.value,
      number_tables: this.reservationForm.controls.numberTables.value,
      arrival_date: this.reservationForm.controls.arrivalDate.value,
      status: this.reservationForm.controls.status.value,
      customer: this.selectedCustomerId,
    }

    console.log(data);
    this.isReservationSaving = true;

    this.reservationsApi.putReservation(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isReservationSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isReservationSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteReservation(){
    this.isReservationDeleting = true;

    this.reservationsApi.deleteReservation()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/reservations/all-reservations');
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

    this.reservationForm.controls.customerName.setValue(customerData.customer_name);
    this.selectedCustomerId = customerData.id;
  }

  onPrint(){
    console.log("lets start printing...");
    // this.reservationsPrint.printViewReservation();
  }

}
