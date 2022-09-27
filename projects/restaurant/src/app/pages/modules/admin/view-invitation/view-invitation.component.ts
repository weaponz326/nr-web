import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { SettingsApiService } from 'projects/personal/src/app/services/modules-api/settings-api/settings-api.service';


@Component({
  selector: 'app-view-invitation',
  templateUrl: './view-invitation.component.html',
  styleUrls: ['./view-invitation.component.scss']
})
export class ViewInvitationComponent implements OnInit {

  constructor(private settingsApi: SettingsApiService) { }

  @Output() updatedEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  invitationData: any;
  isUpdating = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    console.log(data);
    this.invitationData = data;

    this.editButton.nativeElement.click();
  }

  updateInvitation(choice: any){
    this.isUpdating = true;

    let data = { invitation_status: choice }

    this.settingsApi.putInvitation(this.invitationData.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updatedEvent.emit();
          this.editButton.nativeElement.click();
          this.isUpdating = false;
        },
        error: (err) => {
          console.log(err);
          this.isUpdating = false;
          this.connectionToast.openToast();
        }
      })
  }

}
