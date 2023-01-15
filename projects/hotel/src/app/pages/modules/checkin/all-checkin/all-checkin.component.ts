import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

// import { CheckinApiService } from 'projects/hotel/src/app/services/modules-api/checkin-api/checkin-api.service';


@Component({
  selector: 'app-all-checkin',
  templateUrl: './all-checkin.component.html',
  styleUrls: ['./all-checkin.component.scss']
})
export class AllCheckinComponent implements OnInit {

  constructor(
    private router: Router,
    // private checkinApi: CheckinApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Check-Ins", url: "/home/checkin/all-checkin" },
  ];

  checkinGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountCheckin(1, 20, "-created_at");
  }

  getAccountCheckin(page: any, size: any, sortField: any){
    this.isFetchingGridData =  true;

    // this.checkinApi.getAccountCheckin(page, size, sortField)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.checkinGridData = res.results;

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
    this.getAccountCheckin(1, 20, column);

    this.currentSortColumn = column;
  }

  viewCheckin(checkinId: any){
    console.log(checkinId);

    sessionStorage.setItem("hotel_checkin_id", checkinId);
    this.router.navigateByUrl("/home/checkin/view-checkin");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.checkinPrint.printAllCheckin();
  }

}
