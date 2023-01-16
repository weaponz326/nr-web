import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

// import { SelectBatchComponent } from 'projects/hotel/src/app/components/select-windows/roster-windows/select-batch/select-batch.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { DateRangeService } from 'projects/personal/src/app/services/module-utilities/date-range/date-range.service';
// import { RosterApiService } from 'projects/hotel/src/app/services/modules-api/roster-api/roster-api.service';
// import { RosterDay } from 'projects/hotel/src/app/models/modules/roster/roster.model';


@Component({
  selector: 'app-roster-sheet',
  templateUrl: './roster-sheet.component.html',
  styleUrls: ['./roster-sheet.component.scss']
})
export class RosterSheetComponent implements OnInit {

  constructor(
    private router: Router,
    // private rosterApi: RosterApiService,
    private dateRange: DateRangeService,
  ) { }

  // @ViewChild('selectBatchComponentReference', { read: SelectBatchComponent, static: false }) selectBatch!: SelectBatchComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isFetchingSheetData = false;
  isSheetSaving = false;

  rosterDateRange: any;
  rosterDaysData: any;
  rosterShiftsData: any;

  selectedSheetShift: any;
  selectedSheetBatch: any;
  selectedSheetDay: any;

  ngOnInit(): void {
    this.getRoster();
    this.getRosterShift();
    this.getRosterRosterDay();
  }

  getRoster(){
    // this.rosterApi.getRoster()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
          
    //       this.rosterDateRange = this.dateRange.getDateRange(new Date(res.from_date), new Date(res.to_date));
    //       console.log(this.rosterDateRange);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  getRosterShift(){
    // this.rosterApi.getRosterShift()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.rosterShiftsData = res;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  getRosterRosterDay(){
    // this.rosterApi.getRosterRosterDay()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.rosterDaysData = res;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  postRosterDay(e: any){
    console.log(e);
    this.selectedSheetBatch = e.id;

    // let rosterDay: RosterDay = {
    let rosterDay = {
      roster: sessionStorage.getItem('hotel_roster_id') as string,
      batch: this.selectedSheetBatch,
      shift: this.selectedSheetShift,
      day: formatDate(this.selectedSheetDay, 'yyyy-MM-dd', 'en-US')
    } 

    console.log(rosterDay);

    // this.rosterApi.postRosterDay(rosterDay)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       this.rosterDaysData = res;
    //       this.getRosterRosterDay();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  editSheet(shift: any, date: any){
    this.selectedSheetShift = shift;
    this.selectedSheetDay = date;

    // this.selectBatch.openModal();
  }

}
