import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-leave',
  templateUrl: './all-leave.component.html',
  styleUrls: ['./all-leave.component.scss']
})
export class AllLeaveComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Leave", url: "/home/leave/all-leave" },
  ];

  leaveGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountLeave(1, 20, "-created_at");
  }

  getAccountLeave(page: any, size: any, sortField: any){
    this.isFetchingGridData =  true;


  }

  sortTable(column: any){
    console.log(column);
    this.getAccountLeave(1, 20, column);

    this.currentSortColumn = column;
  }

  viewLeave(leaveId: any){
    console.log(leaveId);

    sessionStorage.setItem("enterprise_leave_id", leaveId);
    this.router.navigateByUrl("/home/leave/view-leave");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.leavePrint.printAllLeave();
  }

}
