import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { NursesApiService } from 'projects/hospital/src/app/services/modules-api/nurses-api/nurses-api.service';
// import { NursesPrintService } from 'projects/hospital/src/app/services/modules-printing/nurses-print/nurses-print.service';


@Component({
  selector: 'app-all-nurses',
  templateUrl: './all-nurses.component.html',
  styleUrls: ['./all-nurses.component.scss']
})
export class AllNursesComponent implements OnInit {

  constructor(
    private router: Router,
    private nursesApi: NursesApiService,
    // private nursesPrint: NursesPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Nurses", url: "/home/nurses/all-nurses" },
  ];

  nursesGridData: any[] = [];

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
    this.getAccountNurse(1, 20, "-created_at");
  }

  getAccountNurse(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.nursesApi.getAccountNurse(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.nursesGridData = res.results;

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
    this.getAccountNurse(1, 20, column);

    this.currentSortColumn = column;
  }

  viewNurse(nurseId: any){
    console.log(nurseId);

    sessionStorage.setItem('hospital_nurse_id', nurseId);
    this.router.navigateByUrl('/home/nurses/view-nurse');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.nursesPrint.printAllNurses();
  }

}
