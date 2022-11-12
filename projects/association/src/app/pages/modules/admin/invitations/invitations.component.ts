import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { ViewInvitationComponent } from '../view-invitation/view-invitation.component';

import { AdminApiService } from 'projects/association/src/app/services/modules-api/admin-api/admin-api.service';


@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent implements OnInit {

  constructor(
    private router: Router,
    private adminApi: AdminApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('viewInvitationComponentReference', { read: ViewInvitationComponent, static: false }) viewInvitation!: ViewInvitationComponent;

  navHeading: any[] = [
    { text: "Invitations", url: "/home/admin/invitations" },
  ];

  invitationsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountInvitation(1, 20, "-created_at");
  }

  getAccountInvitation(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.adminApi.getAccountInvitation(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.invitationsGridData = res.results;

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

  openInvitation(data: any){
    this.viewInvitation.openModal(data);
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountInvitation(1, 20, column);

    this.currentSortColumn = column;
  }

}
