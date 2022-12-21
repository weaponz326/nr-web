import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DepartmentFormComponent } from '../department-form/department-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { ClassesApiService } from 'projects/school/src/app/services/modules-api/classes-api/classes-api.service';
// import { ClassesPrintService } from 'projects/school/src/app/services/printing/classes-print/classes-print.service';

import { Department } from 'projects/school/src/app/models/modules/classes/classes.model';


@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {

  constructor(
    private router: Router,
    private classesApi: ClassesApiService,
    // private classesPrint: ClassesPrintService,
  ) { }

  @ViewChild('departmentFormComponentReference', { read: DepartmentFormComponent, static: false }) departmentForm!: DepartmentFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Departments", url: "/home/classes/all-departments" },
    { text: "View Department", url: "/home/classes/view-department" },
  ];

  departmentData: any;

  isDepartmentLoading = false;
  isDepartmentSaving = false;
  isDepartmentDeleting = false;

  ngOnInit(): void {
    this.getDepartment();
  }

  getDepartment(){
    this.isDepartmentLoading = true;

    this.classesApi.getDepartment()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.departmentData = res;
          this.isDepartmentLoading = false;

          this.departmentForm.departmentForm.controls.departmentName.setValue(res.department_name);
          this.departmentForm.departmentForm.controls.departmentDescription.setValue(res.department_description);
          this.departmentForm.departmentForm.controls.term.setValue(res.term?.term_name);
          this.departmentForm.departmentForm.controls.departmentHead.setValue(res.department_head?.first_name + " " + res.department_head?.last_name);

          this.departmentForm.selectedTermId = res.term?.id
          this.departmentForm.selectedTeacherId = res.department_head?.id
        },
        error: (err) => {
          console.log(err);
          this.isDepartmentLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putDepartment(){
    let data = {
      department_name: this.departmentForm.departmentForm.controls.departmentName.value,
      department_description: this.departmentForm.departmentForm.controls.departmentDescription.value,
      department_head: this.departmentForm.selectedTeacherId,
    }

    console.log(data);
    this.isDepartmentSaving = true;

    this.classesApi.putDepartment(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isDepartmentSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isDepartmentSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteDepartment(){
    this.isDepartmentDeleting = true;

    this.classesApi.deleteDepartment()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/classes/all-classes');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.classesPrint.printViewDepartment();
  }

}
