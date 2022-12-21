import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SelectEmployeeComponent } from 'projects/enterprise/src/app/components/select-windows/employees-windows/select-employee/select-employee.component';


@Component({
  selector: 'app-appraisal-form',
  templateUrl: './appraisal-form.component.html',
  styleUrls: ['./appraisal-form.component.scss']
})
export class AppraisalFormComponent implements OnInit {

  constructor() { }

  @ViewChild('selectEmployeeComponentReference', { read: SelectEmployeeComponent, static: false }) selectEmployee!: SelectEmployeeComponent;

  selectedEmployeeId = "";

  appraisalForm = new FormGroup({
    appraisalCode: new FormControl(''),
    appraisalName: new FormControl(''),
    employeeCode: new FormControl(''),
    employeeName: new FormControl(''),
    startDate: new FormControl(),
    endDate: new FormControl(),
    supervisor: new FormControl(''),
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
    this.appraisalForm.controls.employeeCode.setValue(employeeData?.employee_code);
    this.appraisalForm.controls.employeeName.setValue(employeeData?.first_name + " " + employeeData?.last_name);
  }

}
