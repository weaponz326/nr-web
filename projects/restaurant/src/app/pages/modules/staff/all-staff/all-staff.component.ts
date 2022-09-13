import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { StaffApiService } from 'projects/restaurant/src/app/services/modules-api/staff-api/staff-api.service';
import { StaffPrintService } from 'projects/restaurant/src/app/services/modules-printing/staff-print/staff-print.service';


@Component({
  selector: 'app-all-staff',
  templateUrl: './all-staff.component.html',
  styleUrls: ['./all-staff.component.scss']
})
export class AllStaffComponent implements OnInit {

  constructor(
    private router: Router,
    private staffApi: StaffApiService,
    private staffPrint: StaffPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Staff", url: "/home/staff/all-staff" },
  ];

  staffGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountStaff(1, 20, "-created_at");
  }

  getAccountStaff(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.staffApi.getAccountStaff(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.staffGridData = res.results;

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
    this.getAccountStaff(1, 20, column);

    this.currentSortColumn = column;
  }

  viewStaff(staffId: any){
    console.log(staffId);

    sessionStorage.setItem('restaurant_staff_id', staffId);
    this.router.navigateByUrl('/home/staff/view-staff');
  }

  onPrint(){
    console.log("lets start printing...");
    this.staffPrint.printAllStaff();
  }

}
