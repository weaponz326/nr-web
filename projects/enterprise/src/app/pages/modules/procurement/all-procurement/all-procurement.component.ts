import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-procurement',
  templateUrl: './all-procurement.component.html',
  styleUrls: ['./all-procurement.component.scss']
})
export class AllProcurementComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Procurement", url: "/home/procurement/all-procurement" },
  ];

  procurementGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountProcurement(1, 20, "-created_at");
  }

  getAccountProcurement(page: any, size: any, sortField: any){
    this.isFetchingGridData =  true;


  }

  sortTable(column: any){
    console.log(column);
    this.getAccountProcurement(1, 20, column);

    this.currentSortColumn = column;
  }

  viewProcurement(procurementId: any){
    console.log(procurementId);

    sessionStorage.setItem("enterprise_procurement_id", procurementId);
    this.router.navigateByUrl("/home/procurement/view-procurement");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.procurementPrint.printAllProcurement();
  }

}
