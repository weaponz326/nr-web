import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ClassFormComponent } from '../class-form/class-form.component';
import { ClassStudentsComponent } from '../class-students/class-students.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { ClassesApiService } from 'projects/school/src/app/services/modules-api/classes-api/classes-api.service';
// import { ClassesPrintService } from 'projects/school/src/app/services/printing/classes-print/classes-print.service';

import { Clase } from 'projects/school/src/app/models/modules/classes/classes.model';


@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.scss']
})
export class ViewClassComponent implements OnInit {

  constructor(
    private router: Router,
    private classesApi: ClassesApiService,
    // private classesPrint: ClassesPrintService,
  ) { }

  @ViewChild('classFormComponentReference', { read: ClassFormComponent, static: false }) classForm!: ClassFormComponent;
  @ViewChild('classStudentsComponentReference', { read: ClassStudentsComponent, static: false }) classStudents!: ClassStudentsComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Classes", url: "/home/classes/all-classes" },
    { text: "View Class", url: "/home/classes/view-class" },
  ];

  classData: any;

  isClassLoading = false;
  isClassSaving = false;
  isClassDeleting = false;

  ngOnInit(): void {
    this.getClass();
  }

  setStudentClass(){
    // this.classStudents.classCode = this.classForm.classForm.controls.classCode.value;
    // this.classStudents.className = this.classForm.classForm.controls.className.value;
  }

  getClass(){
    this.isClassLoading = true;

    this.classesApi.getClass()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.classData = res;
          this.isClassLoading = false;

          this.classForm.classForm.controls.className.setValue(this.classData.class_name);
          this.classForm.classForm.controls.classAbbreviation.setValue(this.classData.class_abbreviation);
          this.classForm.classForm.controls.grade.setValue(this.classData.grade);
          this.classForm.classForm.controls.department.setValue(this.classData.department?.department_name);
          this.classForm.classForm.controls.classTeacher.setValue(this.classData.class_teacher?.first_name + " " + this.classData.class_teacher?.last_name);
          this.classForm.classForm.controls.location.setValue(this.classData.location);

          this.classForm.selectedTeacherId = this.classData.class_teacher?.id;
          this.classForm.selectedDepartmentId = this.classData.department?.id;

          // this.setStudentClass();
        },
        error: (err) => {
          console.log(err);
          this.isClassLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putClass(){
    console.log('u are saving a new class');

    var data = {
      class_name: this.classForm.classForm.controls.className.value,
      class_abbreviation: this.classForm.classForm.controls.classAbbreviation.value,
      grade: this.classForm.classForm.controls.grade.value,
      location: this.classForm.classForm.controls.location.value,
      department: this.classForm.selectedDepartmentId,
      class_teacher: this.classForm.selectedTeacherId,
    }

    console.log(data);
    this.isClassSaving = true;

    this.classesApi.putClass(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          // this.updateTerm();
          this.setStudentClass();
        },
        error: (err) => {
          console.log(err);
          this.isClassSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteClass(){
    this.isClassDeleting = true;

    this.classesApi.deleteClass()
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
    // this.classesPrint.printViewClass();
  }

}
