import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NewRosterComponent } from '../new-roster/new-roster.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { RosterApiService } from 'projects/restaurant/src/app/services/modules-api/roster-api/roster-api.service';


@Component({
  selector: 'app-all-roster',
  templateUrl: './all-roster.component.html',
  styleUrls: ['./all-roster.component.scss']
})
export class AllRosterComponent implements OnInit {

  constructor(
    private router: Router,
    private rosterApi: RosterApiService
  ) { }

  @ViewChild('newRosterComponentReference', { read: NewRosterComponent, static: false }) newRoster!: NewRosterComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Roster", url: "/home/roster/all-roster" },
  ];

  rosterGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountRoster(1, 20, "-created_at");
  }

  getAccountRoster(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.rosterApi.getAccountRoster(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.rosterGridData = res.results;

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
    this.getAccountRoster(1, 20, column);

    this.currentSortColumn = column;
  }

  viewRoster(rosterId: any){
    console.log(rosterId);
    sessionStorage.setItem("restaurant_roster_id", rosterId);

    this.router.navigateByUrl("/home/roster/view-roster");
  }

  onPrint(){
    console.log("lets start printing...");
  }

}
