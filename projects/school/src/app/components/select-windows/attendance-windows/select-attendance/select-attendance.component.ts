import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { AttendanceApiService } from 'projects/school/src/app/services/modules-api/attendance-api/attendance-api.service';


@Component({
  selector: 'app-select-attendance',
  templateUrl: './select-attendance.component.html',
  styleUrls: ['./select-attendance.component.scss']
})
export class SelectAttendanceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
