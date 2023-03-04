import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NewDispenseComponent } from '../new-dispense/new-dispense.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { DispensaryApiService } from 'projects/hospital/src/app/services/modules-api/dispensary-api/dispensary-api.service';
// import { DispensaryPrintService } from 'projects/hospital/src/app/services/modules-printing/dispensary-print/dispensary-print.service';


@Component({
  selector: 'app-all-dispenses',
  templateUrl: './all-dispenses.component.html',
  styleUrls: ['./all-dispenses.component.scss']
})
export class AllDispensesComponent implements OnInit {

  constructor(
    private router: Router,
    private dispensaryApi: DispensaryApiService,
    // private dispensaryPrint: DispensaryPrintService
  ) { }

  @ViewChild('newDispenseComponentReference', { read: NewDispenseComponent, static: false }) newDispense!: NewDispenseComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Dispenses", url: "/home/dispensary/all-dispenses" },
  ];

  dispensesGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvaidispensele: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountDispense(1, 20, "-created_at");
  }

  getAccountDispense(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.dispensaryApi.getAccountDispense(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.dispensesGridData = res.results;

          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;

          this.isFetchingGridData = false;
          if(this.totalItems == 0)
            this.isDataAvaidispensele = false
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
    this.getAccountDispense(1, 20, column);

    this.currentSortColumn = column;
  }

  viewDispense(dispenseId: any){
    console.log(dispenseId);

    sessionStorage.setItem("hospital_dispense_id", dispenseId);
    this.router.navigateByUrl("/home/dispensary/view-dispense");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.dispensaryPrintService.printAllDispenses();
  }

}
