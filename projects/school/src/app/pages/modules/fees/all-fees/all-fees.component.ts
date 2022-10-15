import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { CreateFeesComponent } from '../create-fees/create-fees.component'

// import { FeesApiService } from 'projects/school/src/app/services/modules/fees-api/fees-api.service';
// import { FeesPrintService } from 'projects/school/src/app/services/printing/fees-print/fees-print.service';


@Component({
  selector: 'app-all-fees',
  templateUrl: './all-fees.component.html',
  styleUrls: ['./all-fees.component.scss']
})
export class AllFeesComponent implements OnInit {

  constructor(
    private router: Router,
    // private feesApi: FeesApiService,
    // private feesPrint: FeesPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('createFeesComponentReference', { read: CreateFeesComponent, static: false }) createFees!: CreateFeesComponent;

  navHeading: any[] = [
    { text: "All Fees", url: "/home/fees/all-fees" },
  ];

  feesGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountFees();
  }

  getAccountFees(){
    this.isFetchingGridData = true;

    // this.feesApi.getAccountFees(this.sortParams, 20)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.feesGridData = res.docs;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountFees();

    this.currentSortColumn = column;
  }

  viewFees(feesId: any){
    console.log(feesId);

    sessionStorage.setItem('school_fees_id', feesId);
    this.router.navigateByUrl('/home/fees/view-fees');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.feesPrint.printAllFees();
  }

}
