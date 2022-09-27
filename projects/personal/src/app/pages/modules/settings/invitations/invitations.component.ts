import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { ViewInvitationComponent } from '../view-invitation/view-invitation.component';

import { SettingsApiService } from 'projects/personal/src/app/services/modules-api/settings-api/settings-api.service';


@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent implements OnInit {

  constructor(
    private settingsApi: SettingsApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('viewInvitationComponentReference', { read: ViewInvitationComponent, static: false }) viewInvitation!: ViewInvitationComponent;

  navHeading: any[] = [
    { text: "Invitations", url: "/home/settings/invitations" },
  ];

  invitationsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getUserInvitation(1, 20, "");
  }

  getUserInvitation(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.settingsApi.getUserInvitation(page, size, sortField)
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
    this.getUserInvitation(1, 20, column);

    this.currentSortColumn = column;
  }

}
