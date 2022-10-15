import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { SelectStudentComponent } from '../../../select-windows/students-windows/select-student/select-student.component';

// import { ClassesApiService } from 'projects/school/src/app/services/modules/classes-api/classes-api.service';
// import { StudentsApiService } from 'projects/school/src/app/services/modules/students-api/students-api.service';

// import { ClassStudent } from 'projects/school/src/app/models/modules/classes/classes.model';


@Component({
  selector: 'app-class-students',
  templateUrl: './class-students.component.html',
  styleUrls: ['./class-students.component.scss']
})
export class ClassStudentsComponent implements OnInit {

  constructor(
    private router: Router,
    // private classesApi: ClassesApiService,
    // private studentsApi: StudentsApiService,
  ) { }

  @ViewChild('modalButtonElementReference', { read: ElementRef, static: false }) modalButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
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

    // this.classesApi.getClassClassStudent()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isFetchingGridData = false;
    //       this.classStudentsGridData = res.docs;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  createClassStudent(studentData: any){
    // let data: ClassStudent = {
    //   clase: sessionStorage.getItem('school_class_id') as string,
    //   student: studentData.id,
    // }

    // this.classesApi.createClassStudent(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.getClassClassStudent();

    //       sessionStorage.setItem('school_student_id', studentData.id);
    //       this.updateStudent();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateStudent(){
    let data = {
      clase: {
        id: sessionStorage.getItem('school_class_id') as string,
      }
    }

    console.log(data);

    // this.studentsApi.updateStudent(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  deleteClassStudent(){
    this.isStudentDeleting = true;

    // this.classesApi.deleteClassStudent()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isStudentDeleting = false;
    //       this.getClassClassStudent();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isStudentDeleting = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  gotoStudent(id: any){
    sessionStorage.setItem('school_student_id', id);
    this.router.navigateByUrl('/home/students/view-student');
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.modalButton.nativeElement.click();
  }

}
