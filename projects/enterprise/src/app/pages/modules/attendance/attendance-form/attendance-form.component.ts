import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.scss']
})
export class AttendanceFormComponent implements OnInit {

  constructor() { }

  selectedYearId = "";

  attendanceForm = new FormGroup({
    attendanceCode: new FormControl(''),
    attendanceName: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    fiscalYear: new FormControl({value: "", disabled: true}),
  })

  ngOnInit(): void {
  }

}
