import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { DrugsApiService } from 'projects/hospital/src/app/services/modules-api/drugs-api/drugs-api.service';
// import { DrugsPrintService } from 'projects/hospital/src/app/services/modules-printing/drugs-print/drugs-print.service';


@Component({
  selector: 'app-all-drugs',
  templateUrl: './all-drugs.component.html',
  styleUrls: ['./all-drugs.component.scss']
})
export class AllDrugsComponent implements OnInit {

  constructor(
    private router: Router,
    private drugsApi: DrugsApiService,
    // private drugsPrint: DrugsPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Drugs", url: "/home/drugs/all-drugs" },
  ];

  drugsGridData: any[] = [];

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
    this.getAccountDrug(1, 20, "-created_at");
  }

  getAccountDrug(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.drugsApi.getAccountDrug(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.drugsGridData = res.results;

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
    this.getAccountDrug(1, 20, column);

    this.currentSortColumn = column;
  }

  viewDrug(drugId: any){
    console.log(drugId);

    sessionStorage.setItem('hospital_drug_id', drugId);
    this.router.navigateByUrl('/home/drugs/view-drug');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.drugsPrint.printAllDrugs();
  }

}
