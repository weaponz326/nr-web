import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { SettingsApiService } from 'projects/personal/src/app/services/modules-api/settings-api/settings-api.service';


@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.scss']
})
export class ViewAccountComponent implements OnInit {

  constructor(private settingsApi: SettingsApiService) { }

  @Output() updatedEvent = new EventEmitter<any>();

  @ViewChild('exitButtonElementReference', { read: ElementRef, static: false }) exitButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  thisUser: any;

  accountData: any;
  isDeleting = false;

  ngOnInit(): void {
  }

  openModal(data: any, suiteName: any){
    console.log(data);
    console.log(suiteName);
    
    this.accountData = data;

    this.exitButton.nativeElement.click();
  }

  deleteAccountUser(){
    this.isDeleting = true;

    this.settingsApi.deleteAccountUser(this.accountData.id, 'restaurant')
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updatedEvent.emit();
          this.exitButton.nativeElement.click();
          this.isDeleting = false;
        },
        error: (err) => {
          console.log(err);
          this.isDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

}
