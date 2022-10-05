import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { RosterApiService } from 'projects/restaurant/src/app/services/modules-api/roster-api/roster-api.service';

import { Roster } from 'projects/restaurant/src/app/models/modules/roster/roster.model';


@Component({
  selector: 'app-new-roster',
  templateUrl: './new-roster.component.html',
  styleUrls: ['./new-roster.component.scss']
})
export class NewRosterComponent implements OnInit {

  constructor(
    private router: Router,
    private rosterApi: RosterApiService
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isRosterSaving = false;

  rosterForm = new FormGroup({
    rosterCode: new FormControl(''),
    rosterName: new FormControl(''),
    fromDate: new FormControl(),
    toDate: new FormControl(),
  })

  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.getNewrosterCodeConfig();

    this.rosterForm.controls.fromDate.setValue(new Date().toISOString().slice(0, 10))
    this.rosterForm.controls.toDate.setValue(new Date().toISOString().slice(0, 10))
  }

  createRoster(){
    let data: Roster = {
      account: localStorage.getItem('restaurant_id') as string,
      roster_code: this.rosterForm.controls.rosterCode.value as string,
      roster_name: this.rosterForm.controls.rosterName.value as string,
      from_date: this.rosterForm.controls.fromDate.value as Date,
      to_date: this.rosterForm.controls.toDate.value as Date,
    }

    this.isRosterSaving = true;

    this.rosterApi.postRoster(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('restaurant_roster_id', res.id);
            this.dismissButton.nativeElement.click();
            this.router.navigateByUrl('/home/roster/view-roster');
            this.isRosterSaving = false;
          }
        },
        error: (err) => {
          console.log(err);
            this.isRosterSaving = false;
            this.connectionToast.openToast();
        }
      })

    console.log(data);
  }

  getNewrosterCodeConfig(){
    this.rosterForm.controls.rosterCode.disable();

    this.rosterApi.getNewRosterCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code)
            this.rosterForm.controls.rosterCode.setValue(res.code);
          else
            this.rosterForm.controls.rosterCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
  
}
