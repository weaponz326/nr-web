import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'


@Component({
  selector: 'app-all-members',
  templateUrl: './all-members.component.html',
  styleUrls: ['./all-members.component.scss']
})
export class AllMembersComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Members", url: "/home/members/all-members" },
  ];

  membersGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
  }

  getAccountMember(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;


  }

  sortTable(column: any){
    console.log(column);
    this.getAccountMember(1, 20, column);

    this.currentSortColumn = column;
  }

  viewMember(memberId: any){
    console.log(memberId);

    sessionStorage.setItem('association_member_id', memberId);
    this.router.navigateByUrl('/home/members/view-member');
  }


  onPrint(){
    console.log("lets start printing...");
    // this.membersPrint.printAllMembers();
  }

}
