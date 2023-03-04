import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CommitteesApiService } from 'projects/association/src/app/services/modules-api/committees-api/committees-api.service';
// import { CommitteesPrintService } from 'projects/association/src/app/services/modules-printing/committees-print/committees-print.service';


@Component({
  selector: 'app-all-committees',
  templateUrl: './all-committees.component.html',
  styleUrls: ['./all-committees.component.scss']
})
export class AllCommitteesComponent implements OnInit {

  constructor(
    private router: Router,
    private committeesApi: CommitteesApiService,
    // private committeesPrint: CommitteesPrintService,
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
    this.getAccountCommittee(1, 20, "-created_at");
  }

  getAccountCommittee(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.committeesApi.getAccountCommittee(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.committeesGridData = res.results;

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
