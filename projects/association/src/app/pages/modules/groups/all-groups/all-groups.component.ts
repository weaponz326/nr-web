import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { NewGroupComponent } from '../new-group/new-group.component'

import { GroupsApiService } from 'projects/association/src/app/services/modules-api/groups-api/groups-api.service';


@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent implements OnInit {

  constructor(
    private router: Router,
    private groupsApi: GroupsApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newGroupComponentReference', { read: NewGroupComponent, static: false }) newGroup!: NewGroupComponent;

  navHeading: any[] = [
    { text: "All Group", url: "/home/groups/all-groups" },
  ];

  activeTermName: any;

  groupsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountGroup(1, 20, "-created_at");
  }

  getAccountGroup(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.groupsApi.getAccountGroup(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.groupsGridData = res.results;

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
    this.getAccountGroup(1, 20, column);

    this.currentSortColumn = column;
  }

  viewGroup(groupId: any){
    console.log(groupId);

    sessionStorage.setItem('association_group_id', groupId);
    this.router.navigateByUrl('/home/groups/view-group');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.groupPrint.printAllGroup();
  }

}
