import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthApiService } from 'projects/personal/src/app/services/auth/auth-api/auth-api.service';
import { PortalApiService } from 'projects/personal/src/app/services/modules-api/portal-api/portal-api.service';

import { Rink } from 'projects/personal/src/app/models/modules/portal/portal.model';


@Component({
  selector: 'app-new-rink',
  templateUrl: './new-rink.component.html',
  styleUrls: ['./new-rink.component.scss']
})
export class NewRinkComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private authApi: AuthApiService,
    private portalApi: PortalApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  // @ViewChild('selectCalendarComponentReference', { read: SelectCalendarComponent, static: false }) selectCalendar!: SelectCalendarComponent;
  // @ViewChild('selectScheduleComponentReference', { read: SelectScheduleComponent, static: false }) selectSchedule!: SelectScheduleComponent;
  // @ViewChild('selectBudgetComponentReference', { read: SelectBudgetComponent, static: false }) selectBudget!: SelectBudgetComponent;
  // @ViewChild('selectNoteComponentReference', { read: SelectNoteComponent, static: false }) selectNote!: SelectNoteComponent;
  // @ViewChild('selectAccountComponentReference', { read: SelectAccountComponent, static: false }) selectAccount!: SelectAccountComponent;
  // @ViewChild('selectTransactionComponentReference', { read: SelectTransactionComponent, static: false }) selectTransaction!: SelectTransactionComponent;
  // @ViewChild('selectTaskGroupComponentReference', { read: SelectTaskGroupComponent, static: false }) selectTaskGroup!: SelectTaskGroupComponent;
  // @ViewChild('selectTaskItemComponentReference', { read: SelectTaskItemComponent, static: false }) selectTaskItem!: SelectTaskItemComponent;

  navHeading: any[] = [
    { text: "New Rink", url: "/home/portal/search" },
    { text: "Send Rink", url: "/home/portal/search/new-rink" },
  ];

  senderData: any;
  recipientData: any;

  selectedSourceId: any;
  typeSource: any[] = [
    'Account',
    'Budget',
    'Calendar',
    'Note',
    'Schedule',
    'Task Group',
    'Task Item',
    'Transaction'
  ];

  isRinkSending = false;

  rinkForm = new FormGroup({
    recipientName: new FormControl(),
    recipientLocation: new FormControl(),
    rinkType: new FormControl('Calendar'),
    rinkSource: new FormControl(),
    comment: new FormControl()
  })

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getRecipientDetail();
  }

  getRecipientDetail(){
    this.authApi.getSearchDetail(String(sessionStorage.getItem('personalSearchUser')))
      .subscribe({
        next: (res) => {
          console.log(res);

          this.recipientData = res;

          this.rinkForm.controls.recipientName.setValue(this.recipientData.first_name + " " + this.recipientData.last_name);
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
      sender: this.customCookie.getCookie('personal_id') as string,
      recipient: sessionStorage.getItem('personal_rink_recipient') as string,
    }

    console.log(data);
    this.isRinkSending = true;

    this.portalApi.postRink(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isRinkSending = false;

          sessionStorage.setItem('personal_rink_id', res.id);
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

    // if (type == "Calendar")
    //   this.selectCalendar.openModal();
    // else if (type == "Schedule")
    //   this.selectSchedule.openModal();
    // else if (type == "Budget")
    //   this.selectBudget.openModal();
    // else if (type == "Note")
    //   this.selectNote.openModal();
    // else if (type == "Account")
    //   this.selectAccount.openModal();
    // else if (type == "Transaction")
    //   this.selectTransaction.openModal();
    // else if (type == "Task Group")
    //   this.selectTaskGroup.openModal();
    // else if (type == "Task Item")
    //   this.selectTaskItem.openModal();
  }

  onSourceSelected(sourceData: any){
    console.log(sourceData);
    let type = this.rinkForm.controls.rinkType.value;
    this.selectedSourceId = sourceData.id;

    // if (type == "Calendar")
    //   this.rinkForm.controls.rinkSource.setValue(sourceData.calendar_name);
    // else if (type == "Schedule")
    //   this.rinkForm.controls.rinkSource.setValue(sourceData.schedule_name);
    // else if (type == "Budget")
    //   this.rinkForm.controls.rinkSource.setValue(sourceData.budget_name);
    // else if (type == "Note")
    //   this.rinkForm.controls.rinkSource.setValue(sourceData.subject);
    // else if (type == "Account")
    //   this.rinkForm.controls.rinkSource.setValue(sourceData.account_name);
    // else if (type == "Transaction")
    //   this.rinkForm.controls.rinkSource.setValue(sourceData.description);
    // else if (type == "Task Group")
    //   this.rinkForm.controls.rinkSource.setValue(sourceData.task_group);
    // else if (type == "Task Item")
    //   this.rinkForm.controls.rinkSource.setValue(sourceData.item_description);
  }

}
