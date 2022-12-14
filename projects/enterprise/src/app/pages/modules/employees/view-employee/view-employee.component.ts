import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { environment } from 'projects/school/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private employeesPrint: EmployeesPrintService,
  ) { }

  @ViewChild('employeeFormComponentReference', { read: EmployeeFormComponent, static: false }) employeeForm!: EmployeeFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Employees", url: "/home/employees/all-employees" },
    { text: "View Employee", url: "/home/employees/view-employee" },
  ];

  employeeData: any;

  isEmployeeLoading = false;
  isEmployeeSaving = false;
  isEmployeeDeleting = false;

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(){
    this.isEmployeeLoading = true;

    // this.employeesApi.getEmployee()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.employeeData = res;
    //       this.isEmployeeLoading = false;

    //       this.employeeForm.employeeForm.controls.employeeCode.setValue(this.employeeData.employee_code);
    //       this.employeeForm.employeeForm.controls.firstName.setValue(this.employeeData.first_name);
    //       this.employeeForm.employeeForm.controls.lastName.setValue(this.employeeData.last_name);
    //       this.employeeForm.employeeForm.controls.sex.setValue(this.employeeData.sex);
    //       this.employeeForm.employeeForm.controls.employeeCode.setValue(this.employeeData.employee_code);
    //       this.employeeForm.employeeForm.controls.startedWork.setValue(this.employeeData.started_work);
    //       this.employeeForm.employeeForm.controls.endedWork.setValue(this.employeeData.ended_work);
    //       this.employeeForm.employeeForm.controls.workStatus.setValue(this.employeeData.work_status);
    //       this.employeeForm.employeeForm.controls.department.setValue(this.employeeData.department);
    //       this.employeeForm.employeeForm.controls.job.setValue(this.employeeData.job);
    //       this.employeeForm.employeeForm.controls.payGrade.setValue(this.employeeData.pay_grade);
    //       this.employeeForm.employeeForm.controls.ssnReference.setValue(this.employeeData.ssn_reference);
    //       this.employeeForm.employeeForm.controls.nationality.setValue(this.employeeData.nationality);
    //       this.employeeForm.employeeForm.controls.religion.setValue(this.employeeData.religion);
    //       this.employeeForm.employeeForm.controls.phone.setValue(this.employeeData.phone);
    //       this.employeeForm.employeeForm.controls.email.setValue(this.employeeData.email);
    //       this.employeeForm.employeeForm.controls.address.setValue(this.employeeData.address);
    //       this.employeeForm.employeeForm.controls.state.setValue(this.employeeData.state);
    //       this.employeeForm.employeeForm.controls.city.setValue(this.employeeData.city);
    //       this.employeeForm.employeeForm.controls.postCode.setValue(this.employeeData.post_code);

    //       if (this.employeeData.photo != null)
    //         this.employeeForm.photo.imgSrc = environment.apiUrl.slice(0, -1) + this.employeeData.photo;
    //       else
    //         this.employeeForm.photo.imgSrc = 'assets/images/utilities/photo-avatar.jpg';
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isEmployeeLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putEmployee(){
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

    // this.employeesApi.putEmployee(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(this.employeeForm.photo.isImageChanged){
    //         this.putEmployeeImage();
    //       }
    //       else{
    //         this.isEmployeeSaving = false;
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isEmployeeSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteEmployee(){
  //   this.isEmployeeDeleting = true;

  //   this.employeesApi.deleteEmployee()
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.isEmployeeDeleting = false;
  //         this.router.navigateByUrl('/home/employees/all-employee');
  //       },
  //       error: (err) => {
  //         console.log(err);
  //         this.connectionToast.openToast();
  //         this.isEmployeeDeleting = false;
  //       }
  //     })
  }

  putEmployeeImage(){
    // this.employeesApi.putEmployeePhoto(this.employeeForm.photo.image)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isEmployeeSaving = false;
    //     },
    //     error: (err) => {
    //       console.log(err);          
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.employeesPrint.printViewEmployee();
  }

}
