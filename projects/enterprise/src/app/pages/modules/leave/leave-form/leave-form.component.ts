import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent implements OnInit {

  constructor() { }

  leaveForm = new FormGroup({
    leaveCode: new FormControl(''),
    employeeCode: new FormControl(''),
    employeeName: new FormControl(''),
    leaveType: new FormControl(''),
    leaveStart: new FormControl(),
    leaveEnd: new FormControl(),
    leaveStatus: new FormControl(''),
  });
  
  ngOnInit(): void {
  }

}
