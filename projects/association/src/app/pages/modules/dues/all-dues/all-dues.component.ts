import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'


@Component({
  selector: 'app-all-dues',
  templateUrl: './all-dues.component.html',
  styleUrls: ['./all-dues.component.scss']
})
export class AllDuesComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Dues", url: "/home/dues/all-dues" },
  ];

  duesGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
  }

  getAccountDues(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;


  }

  sortTable(column: any){
    console.log(column);
    this.getAccountDues(1, 20, column);

    this.currentSortColumn = column;
  }

  viewDues(duesId: any){
    console.log(duesId);

    sessionStorage.setItem('association_dues_id', duesId);
    this.router.navigateByUrl('/home/dues/view-dues');
  }


  onPrint(){
    console.log("lets start printing...");
    // this.duesPrint.printAllDues();
  }

}
