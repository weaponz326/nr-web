import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { RosterApiService } from 'projects/restaurant/src/app/services/modules-api/roster-api/roster-api.service';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'


@Component({
  selector: 'app-roster-sheet',
  templateUrl: './roster-sheet.component.html',
  styleUrls: ['./roster-sheet.component.scss']
})
export class RosterSheetComponent implements OnInit {

  constructor(
    private router: Router,
    private rosterApi: RosterApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  dataSource: any[] = [];
  sheetColumns: any[] = [];
  sheetDataFields: any = [];
  sheetEditDropDownSource: any[] = [];

  isFetchingSheetData = false;
  isSheetSaving = false;

  rosterSheetData: any;
  rosterShiftsData: any;
  rosterBatchesData: any;

  sheetDays: any[] = [];
  sheetShifts: any[] = [];

  ngOnInit(): void {
    this.getRosterSheet();
    this.getRosterShift();
    this.getRosterBatch();
  }

  getRosterSheet(){
    this.rosterApi.getRosterSheet()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.sheetDays = res.days;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getRosterShift(){
    this.rosterApi.getRosterShift()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.rosterShiftsData = res;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getRosterBatch(){
    this.rosterApi.getRosterBatch()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.rosterBatchesData = res;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  // TODO: needs extensive review

  setRosterColumns(shiftDays: any){
    // set datafields
    this.sheetDataFields = [];
    this.sheetDataFields.push('id: string');
    this.sheetDataFields.push('shift_id: string');
    this.sheetDataFields.push('shift_name: string');

    // set columns
    this.sheetColumns = [];
    this.sheetColumns.push({ label: "Shift Name", dataField: "shift_name", width: "18%" });

    shiftDays.forEach((day: { id: any; day: any; }) => {
      // datafields
      this.sheetDataFields.push({ name: day.id, type: 'string' });

      // columns
      var dayColumn = { label: day.day, dataField: day.id, editable: "true", width: 100 };
      this.sheetColumns.push(dayColumn);
    });
  }

  populateSheetShifts(shiftData: any){
    shiftData.forEach((shift: { id: any; shift_name: any; }) => {
      let data = { id: shift.id, shift_id: shift.id, shift_name: shift.shift_name };
      this.dataSource.push(data);
    });

    console.log(this.dataSource);
  }

}
