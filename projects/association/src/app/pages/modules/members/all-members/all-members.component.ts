import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { MembersApiService } from 'projects/association/src/app/services/modules-api/members-api/members-api.service';
// import { MembersPrintService } from 'projects/school/src/app/services/printing/members-print/members-print.ser

@Component({
  selector: 'app-all-members',
  templateUrl: './all-members.component.html',
  styleUrls: ['./all-members.component.scss']
})
export class AllMembersComponent implements OnInit {

  constructor(
    private router: Router,
    private membersApi: MembersApiService,
    // private membersPrint: MembersPrintService,
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
    this.getAccountMember(1, 20, "-created_at");
  }

  getAccountMember(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.membersApi.getAccountMember(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.membersGridData = res.results;

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
