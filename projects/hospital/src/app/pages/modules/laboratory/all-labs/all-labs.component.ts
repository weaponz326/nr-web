import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NewLabComponent } from '../new-lab/new-lab.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { LaboratoryApiService } from 'projects/hospital/src/app/services/modules-api/laboratory-api/laboratory-api.service';
// import { LaboratoryPrintService } from 'projects/hospital/src/app/services/modules-printing/laboratory-print/laboratory-print.service';


@Component({
  selector: 'app-all-labs',
  templateUrl: './all-labs.component.html',
  styleUrls: ['./all-labs.component.scss']
})
export class AllLabsComponent implements OnInit {

  constructor(
    private router: Router,
    // private labsApi: LaboratoryApiService,
    // private labsPrint: LaboratoryPrintService
  ) { }

  @ViewChild('newLabComponentReference', { read: NewLabComponent, static: false }) newLab!: NewLabComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Labs", url: "/home/laboratory/all-labs" },
  ];

  labsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountLab(1, 20, "-created_at");
  }

  getAccountLab(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    // this.labsApi.getAccountLab(page, size, sortField)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.labsGridData = res.results;

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
    this.getAccountLab(1, 20, column);

    this.currentSortColumn = column;
  }

  viewLab(labId: any){
    console.log(labId);

    sessionStorage.setItem("hospital_lab_id", labId);
    this.router.navigateByUrl("/home/labs/view-lab");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.laboratoryPrintService.printAllLabs();
  }

}
