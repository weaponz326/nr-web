import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DepartmentFormComponent } from '../department-form/department-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
import { ClassesApiService } from 'projects/school/src/app/services/modules-api/classes-api/classes-api.service';

import { Department } from 'projects/school/src/app/models/modules/classes/classes.model';


@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  constructor(
    private router: Router,
    private classesApi: ClassesApiService  
  ) { }

  @ViewChild('departmentFormComponentReference', { read: DepartmentFormComponent, static: false }) departmentForm!: DepartmentFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Department", url: "/home/classes/new-department" },
  ];

  isDepartmentSaving = false;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let activeTerm = JSON.parse(String(localStorage.getItem('schoolActiveTerm')));
    
    this.departmentForm.selectedTermId = activeTerm.term.id
    this.departmentForm.departmentForm.controls.term.setValue(activeTerm.term.term_name);
  }

  postDepartment(){
    let data: Department = {
      account: localStorage.getItem('school_id') as string,
      department_name: this.departmentForm.departmentForm.controls.departmentName.value as string,
      department_description: this.departmentForm.departmentForm.controls.departmentDescription.value as string,
      terms: [this.departmentForm.selectedTermId],
      department_head: this.departmentForm.selectedTeacherId,
    }

    this.isDepartmentSaving = true;

    this.classesApi.postDepartment(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          sessionStorage.setItem('school_department_id', res.id);
          this.router.navigateByUrl('/home/classes/view-department');
          this.isDepartmentSaving = true;
        },
        error: (err) => {
          console.log(err);
          this.isDepartmentSaving = true;
          this.connectionToast.openToast();
        }
      })
  }

}
