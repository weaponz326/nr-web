import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { Rink } from 'projects/hotel/src/app/models/modules/portal/portal.model';
import { AccountApiService } from 'projects/hotel/src/app/services/account-api/account-api.service';
import { PortalApiService } from 'projects/hotel/src/app/services/modules-api/portal-api/portal-api.service';


@Component({
  selector: 'app-new-rink',
  templateUrl: './new-rink.component.html',
  styleUrls: ['./new-rink.component.scss']
})
export class NewRinkComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private accountApi: AccountApiService,
    private portalApi: PortalApiService,
  ) { }
  
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Rink", url: "/home/portal/search" },
    { text: "Send Rink", url: "/home/portal/search/new-rink" },
  ];

  senderData: any;
  recipientData: any;

  selectedSourceId: any;
  typeSource: any[] = [
    
  ];

  isRinkSending = false;

  rinkForm = new FormGroup({
    recipientName: new FormControl(),
    recipientLocation: new FormControl(),
    rinkType: new FormControl(''),
    rinkSource: new FormControl(),
    comment: new FormControl()
  })

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getRecipientDetail();
  }

  getRecipientDetail(){
    this.accountApi.getSearchDetail(String(sessionStorage.getItem('hotelSearchAccount')))
      .subscribe({
        next: (res) => {
          console.log(res);

          this.recipientData = res;

          this.rinkForm.controls.recipientName.setValue(this.recipientData.name);
          this.rinkForm.controls.recipientLocation.setValue(this.recipientData.location);
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  createRink(){
    let data: Rink = {
      rink_type: this.rinkForm.controls.rinkType.value as string,
      rink_source: this.selectedSourceId,
      comment: this.rinkForm.controls.comment.value as string,
      sender: this.customCookie.getCookie('hotel_id') as string,
      recipient: sessionStorage.getItem('hotel_rink_recipient') as string,
    }

    console.log(data);
    this.isRinkSending = true;

    this.portalApi.postRink(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isRinkSending = false;

          sessionStorage.setItem('hotel_rink_id', res.id);
          this.router.navigateByUrl('/home/portal/view-rink');
        },
        error: (err) => {
          console.log(err);
          this.isRinkSending = false;
          this.connectionToast.openToast();
        }
      })
  }

  onTypeSelected(){
    console.log("why did u change the type?");
    this.rinkForm.controls.rinkSource.setValue("");
  }

  openSourceWindow(){
    let type = this.rinkForm.controls.rinkType.value;
    console.log("You are opening a " + type + " rink type")
  }

  onSourceSelected(sourceData: any){
    console.log(sourceData);
    let type = this.rinkForm.controls.rinkType.value;
    this.selectedSourceId = sourceData.id;
  }

}
