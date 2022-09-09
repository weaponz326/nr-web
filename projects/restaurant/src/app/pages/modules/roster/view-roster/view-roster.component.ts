import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ShiftsComponent } from '../shifts/shifts.component';
import { RosterSheetComponent } from '../roster-sheet/roster-sheet.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { RosterApiService } from 'projects/restaurant/src/app/services/modules-api/roster-api/roster-api.service';

import { Roster } from 'projects/restaurant/src/app/models/modules/roster/roster.model';


@Component({
  selector: 'app-view-roster',
  templateUrl: './view-roster.component.html',
  styleUrls: ['./view-roster.component.scss']
})
export class ViewRosterComponent implements OnInit {

  constructor(
    private router: Router,
    private rosterApi: RosterApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('rosterSheetComponentReference', { read: RosterSheetComponent, static: false }) rosterSheet!: RosterSheetComponent;
  @ViewChild('shiftsComponentReference', { read: ShiftsComponent, static: false }) shifts!: ShiftsComponent;

  navHeading: any[] = [
    { text: "All Roster", url: "/home/roster/all-roster" },
    { text: "View Roster", url: "/home/roster/view-roster" },
  ];

  rosterFormData: any;

  isRosterLoading: boolean = false;
  isRosterSaving: boolean = false;
  isRosterDeleting: boolean = false;

  rosterForm = new FormGroup({
    rosterCode: new FormControl(''),
    rosterName: new FormControl(''),
    fromDate: new FormControl(),
    toDate: new FormControl(),
  })

  ngOnInit(): void {
    this.getRoster();
  }

  getRoster(){
    this.isRosterLoading = true;

    this.rosterApi.getRoster()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.rosterFormData = res;

          this.rosterForm.controls.rosterCode.setValue(this.rosterFormData.roster_code);
          this.rosterForm.controls.rosterName.setValue(this.rosterFormData.roster_name);
          this.rosterForm.controls.fromDate.setValue(this.rosterFormData.from_date);
          this.rosterForm.controls.toDate.setValue(this.rosterFormData.to_date);

          this.isRosterLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isRosterLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  postRoster(){
    let data = {
      roster_name: this.rosterForm.controls.rosterName.value,
      roster_code: this.rosterForm.controls.rosterCode.value,
      from_date: this.rosterForm.controls.fromDate.value,
      to_date: this.rosterForm.controls.toDate.value,
    }

    this.isRosterSaving = true;

    this.rosterApi.putRoster(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isRosterSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isRosterSaving = false;
          this.connectionToast.openToast();
        }
      })

    console.log(data);

    // TODO:
    // this.rosterSheet.postSheetData();
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteRoster(){
    this.isRosterDeleting = true;

    this.rosterApi.deleteRoster()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isRosterDeleting = false;
          this.router.navigateByUrl('/home/roster/all-roster');
        },
        error: (err) => {
          console.log(err);
          this.isRosterDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
  }

}
