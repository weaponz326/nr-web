import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AddBookingComponent } from '../add-booking/add-booking.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { BookingsApiService } from 'projects/hotel/src/app/services/modules-api/bookings-api/bookings-api.service';
// import { BookingsPrintService } from 'projects/hotel/src/app/services/modules-printing/bookings-print/bookings-print.service';


@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.scss']
})
export class AllBookingsComponent implements OnInit {

  constructor(
    private router: Router,
    // private bookingsApi: BookingsApiService,
    // private bookingsPrint: BookingsPrintService
  ) { }

  @ViewChild('addBookingComponentReference', { read: AddBookingComponent, static: false }) addBooking!: AddBookingComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Bookings", url: "/home/bookings/all-bookings" },
  ];

  bookingsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountBooking(1, 20, "-created_at");
  }

  getAccountBooking(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    // this.bookingsApi.getAccountBooking(page, size, sortField)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.bookingsGridData = res.results;

    //       this.currentPage = res.current_page;
    //       this.totalPages = res.total_pages;
    //       this.totalItems = res.count;

    //       this.isFetchingGridData = false;
    //       if(this.totalItems == 0)
    //         this.isDataAvailable = false
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountBooking(1, 20, column);

    this.currentSortColumn = column;
  }

  viewBooking(bookingId: any){
    console.log(bookingId);

    sessionStorage.setItem("hotel_booking_id", bookingId);
    this.router.navigateByUrl("/home/bookings/view-booking");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.bookingsPrint.printAllBookings()
  }

}
