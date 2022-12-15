import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'


@Component({
  selector: 'app-all-years',
  templateUrl: './all-years.component.html',
  styleUrls: ['./all-years.component.scss']
})
export class AllYearsComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Fiscal Years", url: "/home/fiscal-year/all-years" },
  ];

  yearsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
  }

  getAccountYear(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;


  }

  sortTable(column: any){
    console.log(column);
    this.getAccountYear(1, 20, column);

    this.currentSortColumn = column;
  }

  viewYear(yearId: any){
    console.log(yearId);

    sessionStorage.setItem('enterprise_year_id', yearId);
    this.router.navigateByUrl('/home/years/view-year');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.yearsPrint.printAllYears();
  }

}
