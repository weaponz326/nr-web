import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { EmployeesApiService } from 'projects/enterprise/src/app/services/modules-api/employees-api/employees-api.service';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private employeesApi: EmployeesApiService,
  ) { }

  @ViewChild('employeeFormComponentReference', { read: EmployeeFormComponent, static: false }) employeeForm!: EmployeeFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Employee", url: "/home/employees/new-employee" },
  ];

  storageBasePath = "/enterprise/" + this.customCookie.getCookie('enterprise_id') + "/module_employees/";

  isEmployeeSaving = false;

  ngOnInit(): void {
    this.getNewEmployeeCodeConfig();
  }

  postEmployee(){
    console.log('u are saving a new employee');

    var data = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      first_name: this.employeeForm.employeeForm.controls.firstName.value as string,
      last_name: this.employeeForm.employeeForm.controls.lastName.value as string,
      sex: this.employeeForm.employeeForm.controls.sex.value as string,
      date_of_birth: this.employeeForm.bday.getValue(),
      employee_code: this.employeeForm.employeeForm.controls.employeeCode.value as string,
      started_work: this.employeeForm.employeeForm.controls.startedWork.value,
      ended_work: this.employeeForm.employeeForm.controls.endedWork.value,
      work_status: this.employeeForm.employeeForm.controls.workStatus.value as string,
      department: this.employeeForm.employeeForm.controls.department.value as string,
      job: this.employeeForm.employeeForm.controls.job.value as string,
      pay_grade: this.employeeForm.employeeForm.controls.payGrade.value as string,
      ssn_reference: this.employeeForm.employeeForm.controls.ssnReference.value as string,
      nationality: this.employeeForm.employeeForm.controls.nationality.value as string,
      religion: this.employeeForm.employeeForm.controls.religion.value as string,
      phone: this.employeeForm.employeeForm.controls.phone.value as string,
      email: this.employeeForm.employeeForm.controls.email.value as string,
      address: this.employeeForm.employeeForm.controls.address.value as string,
      state: this.employeeForm.employeeForm.controls.state.value as string,
      city: this.employeeForm.employeeForm.controls.city.value as string,
      post_code: this.employeeForm.employeeForm.controls.postCode.value as string,
    }

    console.log(data);
    this.isEmployeeSaving = true;

    this.employeesApi.postEmployee(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem('enterprise_employee_id', res.id);

          if(this.employeeForm.photo.isImageChanged){
            this.putEmployeeImage();
          }
          else{
            this.router.navigateByUrl('/home/employees/view-employee');                    
          }
        },
        error: (err) => {
          console.log(err);
          this.isEmployeeSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  putEmployeeImage(){
    this.employeesApi.putEmployeePhoto(this.employeeForm.photo.image)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/employees/view-employee');                    
        },
        error: (err) => {
          console.log(err);          
          this.connectionToast.openToast();
        }
      })
  }

  getNewEmployeeCodeConfig(){


  }

}
