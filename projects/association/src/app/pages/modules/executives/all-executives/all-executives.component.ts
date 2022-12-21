import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'


@Component({
  selector: 'app-all-executives',
  templateUrl: './all-executives.component.html',
  styleUrls: ['./all-executives.component.scss']
})
export class AllExecutivesComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Executives", url: "/home/executives/all-executives" },
  ];

  executivesGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
  }

  getAccountExecutive(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;


  }

  sortTable(column: any){
    console.log(column);
    this.getAccountExecutive(1, 20, column);

    this.currentSortColumn = column;
  }

  viewExecutive(executiveId: any){
    console.log(executiveId);

    sessionStorage.setItem('association_executive_id', executiveId);
    this.router.navigateByUrl('/home/executives/view-executive');
  }


  onPrint(){
    console.log("lets start printing...");
    // this.executivesPrint.printAllExecutives();
  }

}
