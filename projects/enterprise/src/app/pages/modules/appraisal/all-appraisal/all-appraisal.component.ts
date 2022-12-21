import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { AppraisalApiService } from 'projects/enterprise/src/app/services/modules-api/appraisal-api/appraisal-api.service';


@Component({
  selector: 'app-all-appraisal',
  templateUrl: './all-appraisal.component.html',
  styleUrls: ['./all-appraisal.component.scss']
})
export class AllAppraisalComponent implements OnInit {

  constructor(
    private router: Router,
    private appraisalApi: AppraisalApiService
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

    this.appraisalApi.getAccountAppraisal(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.appraisalGridData = res.results;

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
