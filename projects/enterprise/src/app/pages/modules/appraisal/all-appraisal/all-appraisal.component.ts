import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-appraisal',
  templateUrl: './all-appraisal.component.html',
  styleUrls: ['./all-appraisal.component.scss']
})
export class AllAppraisalComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Appraisal", url: "/home/appraisal/all-appraisal" },
  ];

  appraisalGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountAppraisal(1, 20, "-created_at");
  }

  getAccountAppraisal(page: any, size: any, sortField: any){
    this.isFetchingGridData =  true;


  }

  sortTable(column: any){
    console.log(column);
    this.getAccountAppraisal(1, 20, column);

    this.currentSortColumn = column;
  }

  viewAppraisal(appraisalId: any){
    console.log(appraisalId);

    sessionStorage.setItem("enterprise_appraisal_id", appraisalId);
    this.router.navigateByUrl("/home/appraisal/view-appraisal");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.appraisalPrint.printAllAppraisal();
  }

}
