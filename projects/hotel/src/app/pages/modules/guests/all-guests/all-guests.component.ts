import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { GuestsApiService } from 'projects/hotel/src/app/services/modules-api/guests-api/guests-api.service';
// import { GuestsPrintService } from 'projects/hotel/src/app/services/modules-printing/guests-print/guests-print.service';


@Component({
  selector: 'app-all-guests',
  templateUrl: './all-guests.component.html',
  styleUrls: ['./all-guests.component.scss']
})
export class AllGuestsComponent implements OnInit {

  constructor(
    private router: Router,
    private guestsApi: GuestsApiService,
    // private guestsPrint: GuestsPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Guests", url: "/home/guests/all-guests" },
  ];

  guestsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  sortParams = {
    field: "created_at",
    direction: "desc"
  }

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountGuest(1, 20, "-created_at");
  }

  getAccountGuest(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.guestsApi.getAccountGuest(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.guestsGridData = res.results;

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
    this.getAccountGuest(1, 20, column);

    this.currentSortColumn = column;
  }

  viewGuest(guestId: any){
    console.log(guestId);

    sessionStorage.setItem('hotel_guest_id', guestId);
    this.router.navigateByUrl('/home/guests/view-guest');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.guestsPrint.printAllGuests();
  }

}
