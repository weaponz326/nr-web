import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NewHousekeepingComponent } from '../new-housekeeping/new-housekeeping.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { HousekeepingsApiService } from 'projects/hotel/src/app/services/modules-api/housekeepings-api/housekeepings-api.service';
// import { HousekeepingsPrintService } from 'projects/hotel/src/app/services/modules-printing/housekeepings-print/housekeepings-print.service';


@Component({
  selector: 'app-all-housekeeping',
  templateUrl: './all-housekeeping.component.html',
  styleUrls: ['./all-housekeeping.component.scss']
})
export class AllHousekeepingComponent implements OnInit {

  constructor(
    private router: Router,
    // private housekeepingsApi: HousekeepingsApiService,
    // private housekeepingsPrint: HousekeepingsPrintService
  ) { }

  @ViewChild('newHousekeepingComponentReference', { read: NewHousekeepingComponent, static: false }) newHousekeeping!: NewHousekeepingComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Housekeepings", url: "/home/housekeepings/all-housekeepings" },
  ];

  housekeepingsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountHousekeeping(1, 20, "-created_at");
  }

  getAccountHousekeeping(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    // this.housekeepingsApi.getAccountHousekeeping(page, size, sortField)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.housekeepingsGridData = res.results;

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
    this.getAccountHousekeeping(1, 20, column);

    this.currentSortColumn = column;
  }

  viewHousekeeping(housekeepingId: any){
    console.log(housekeepingId);

    sessionStorage.setItem("hotel_housekeeping_id", housekeepingId);
    this.router.navigateByUrl("/home/housekeepings/view-housekeeping");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.housekeepingsPrint.printAllHousekeepings()
  }

}
