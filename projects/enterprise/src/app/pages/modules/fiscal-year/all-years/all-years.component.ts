import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { FiscalYearApiService } from 'projects/enterprise/src/app/services/modules-api/fiscal-year-api/fiscal-year-api.service';


@Component({
  selector: 'app-all-years',
  templateUrl: './all-years.component.html',
  styleUrls: ['./all-years.component.scss']
})
export class AllYearsComponent implements OnInit {

  constructor(
    private router: Router,
    private fiscalYearApi: FiscalYearApiService
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
    this.getAccountYear(1, 20, "-created_at");
  }

  getAccountYear(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.fiscalYearApi.getAccountFiscalYear(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.yearsGridData = res.results;

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
    this.getAccountYear(1, 20, column);

    this.currentSortColumn = column;
  }

  viewYear(yearId: any){
    console.log(yearId);

    sessionStorage.setItem('enterprise_fiscal_year_id', yearId);
    this.router.navigateByUrl('/home/fiscal-year/view-year');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.yearsPrint.printAllYears();
  }

}
