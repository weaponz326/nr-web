import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { AttendanceApiService } from 'projects/school/src/app/services/modules/attendance-api/attendance-api.service';


@Component({
  selector: 'app-sheet-view',
  templateUrl: './sheet-view.component.html',
  styleUrls: ['./sheet-view.component.scss']
})
export class SheetViewComponent implements OnInit {

  constructor(
    // private attendanceApi: AttendanceApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  Object = Object;

  attendanceSheetData: any = [];

  isFetchingGridData = false;
  isSheetSaving = false;

  ngOnInit(): void {
    this.getAttendanceSheet();
  }

  getAttendanceSheet(){
    this.isFetchingGridData = true;

    // this.attendanceApi.getAttendanceSheet()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.attendanceSheetData = res.data().sheet;
    //       this.isFetchingGridData = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateAttendanceSheet(){
    let data = { sheet: this.attendanceSheetData };

    this.isSheetSaving = true;

    // this.attendanceApi.updateAttendanceSheet(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isSheetSaving = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isSheetSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  onCheckChange(event: any, index: any, key: any){
    console.log(event.target.checked);
    this.attendanceSheetData[index].checks[key] = event.target.checked;
    console.log(this.attendanceSheetData);
  }

  stringToDate(string: string){
    return new Date(string);
  }

}
