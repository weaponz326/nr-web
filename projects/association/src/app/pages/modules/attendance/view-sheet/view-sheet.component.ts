import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'


@Component({
  selector: 'app-view-sheet',
  templateUrl: './view-sheet.component.html',
  styleUrls: ['./view-sheet.component.scss']
})
export class ViewSheetComponent implements OnInit {

  constructor(
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

    
  }

  updateAttendanceSheet(){
    let data = { sheet: this.attendanceSheetData };

    this.isSheetSaving = true;

    
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
