import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'


@Component({
  selector: 'app-all-committees',
  templateUrl: './all-committees.component.html',
  styleUrls: ['./all-committees.component.scss']
})
export class AllCommitteesComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Committees", url: "/home/committees/all-committees" },
  ];

  committeesGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
  }

  getAccountCommittee(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;


  }

  sortTable(column: any){
    console.log(column);
    this.getAccountCommittee(1, 20, column);

    this.currentSortColumn = column;
  }

  viewCommittee(committeeId: any){
    console.log(committeeId);

    sessionStorage.setItem('association_committee_id', committeeId);
    this.router.navigateByUrl('/home/committees/view-committee');
  }


  onPrint(){
    console.log("lets start printing...");
    // this.committeesPrint.printAllCommittees();
  }

}
