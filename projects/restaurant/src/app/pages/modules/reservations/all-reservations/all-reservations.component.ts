import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NewReservationComponent } from '../new-reservation/new-reservation.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { ReservationsApiService } from 'projects/restaurant/src/app/services/modules-api/reservations-api/reservations-api.service';
// import { ReservationsPrintService } from 'projects/restaurant/src/app/services/printing/reservations-print/reservations-print.service';


@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.scss']
})
export class AllReservationsComponent implements OnInit {

  constructor(
    private router: Router,
    private reservationsApi: ReservationsApiService,
    // private reservationsPrint: ReservationsPrintService,
  ) { }

  @ViewChild('newReservationComponentReference', { read: NewReservationComponent, static: false }) newReservation!: NewReservationComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Reservations", url: "/home/reservations/all-reservations" },
  ];

  reservationsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountReservation(1, 20, "-created_at");
  }

  getAccountReservation(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.reservationsApi.getAccountReservation(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.reservationsGridData = res.results;

          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;

          this.isFetchingGridData = false;
          if(this.totalItems == 0)
            this.isDataAvailable = false
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountReservation(1, 20, column);

    this.currentSortColumn = column;
  }

  viewReservation(reservationId: any){
    console.log(reservationId);

    sessionStorage.setItem("restaurant_reservation_id", reservationId);
    this.router.navigateByUrl("/home/reservations/view-reservation");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.reservationsPrint.printAllReservations();
  }

}
