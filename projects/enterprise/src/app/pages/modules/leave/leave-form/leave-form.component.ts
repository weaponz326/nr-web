import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SelectEmployeeComponent } from 'projects/enterprise/src/app/components/select-windows/employees-windows/select-employee/select-employee.component';


@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent implements OnInit {

  constructor() { }

  @ViewChild('selectEmployeeComponentReference', { read: SelectEmployeeComponent, static: false }) selectEmployee!: SelectEmployeeComponent;

  selectedEmployeeId = "";

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

  openEmployeeWindow(){
    console.log("You are opening select employee window")
    this.selectEmployee.openModal();
  }

  onEmployeeSelected(employeeData: any){
    console.log(employeeData);

    this.selectedEmployeeId = employeeData.id;
    this.leaveForm.controls.employeeCode.setValue(employeeData?.employee_code);
    this.leaveForm.controls.employeeName.setValue(employeeData?.first_name + " " + employeeData?.last_name);
  }

}
