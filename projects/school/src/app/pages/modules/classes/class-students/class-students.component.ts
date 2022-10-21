import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'
// import { SelectStudentComponent } from '../../../select-windows/students-windows/select-student/select-student.component';

import { ClassesApiService } from 'projects/school/src/app/services/modules-api/classes-api/classes-api.service';

import { ClassStudent } from 'projects/school/src/app/models/modules/classes/classes.model';


@Component({
  selector: 'app-class-students',
  templateUrl: './class-students.component.html',
  styleUrls: ['./class-students.component.scss']
})
export class ClassStudentsComponent implements OnInit {

  constructor(
    private router: Router,
    private classesApi: ClassesApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  // @ViewChild('selectStudentComponentReference', { read: SelectStudentComponent, static: false }) selectStudent!: SelectStudentComponent;

  classStudentsGridData: any[] = [];

  deleteId = "";

  isFetchingGridData = false;
  isStudentDeleting = false;

  classCode = "";
  className = "";

  ngOnInit(): void {
    this.getClassClassStudent();
  }

  getClassClassStudent(){
    this.isFetchingGridData = true;

    this.classesApi.getClassClassStudent()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isFetchingGridData = false;
          this.classStudentsGridData = res;
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  postClassStudent(studentData: any){
    let data: ClassStudent = {
      clase: sessionStorage.getItem('school_class_id') as string,
      student: studentData.id,
    }

    this.classesApi.postClassStudent(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.getClassClassStudent();
          sessionStorage.setItem('school_student_id', studentData.id);
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  deleteClassStudent(){
    this.isStudentDeleting = true;

    this.classesApi.deleteClassStudent(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isStudentDeleting = false;
          this.getClassClassStudent();
        },
        error: (err) => {
          console.log(err);
          this.isStudentDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  gotoStudent(id: any){
    sessionStorage.setItem('school_student_id', id);
    this.router.navigateByUrl('/home/students/view-student');
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
