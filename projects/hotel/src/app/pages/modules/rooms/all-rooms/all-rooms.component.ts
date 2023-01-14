import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { RoomsApiService } from 'projects/hotel/src/app/services/modules-api/rooms-api/rooms-api.service';
// import { RoomsPrintService } from 'projects/hotel/src/app/services/modules-printing/rooms-print/rooms-print.service';


@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.scss']
})
export class AllRoomsComponent implements OnInit {

  constructor(
    private router: Router,
    // private roomsApi: RoomsApiService,
    // private roomsPrint: RoomsPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Rooms", url: "/home/rooms/all-rooms" },
  ];

  roomsGridData: any[] = [];

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
    this.getAccountRoom(1, 20, "-created_at");
  }

  getAccountRoom(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    // this.roomsApi.getAccountRoom(page, size, sortField)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.roomsGridData = res.results;

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
    this.getAccountRoom(1, 20, column);

    this.currentSortColumn = column;
  }

  viewRoom(roomId: any){
    console.log(roomId);

    sessionStorage.setItem('hotel_room_id', roomId);
    this.router.navigateByUrl('/home/rooms/view-room');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.roomsPrint.printAllRooms();
  }

}
