import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { SelectTeacherComponent } from '../../../select-windows/teachers-windows/select-teacher/select-teacher.component';

// import { SubjectsApiService } from 'projects/school/src/app/services/modules/subjects-api/subjects-api.service';
// import { SubjectTeacher } from 'projects/school/src/app/models/modules/subjects/subjects.model';


@Component({
  selector: 'app-subject-teachers',
  templateUrl: './subject-teachers.component.html',
  styleUrls: ['./subject-teachers.component.scss']
})
export class SubjectTeachersComponent implements OnInit {

  constructor(
    private router: Router,
    // private subjectsApi: SubjectsApiService,
  ) { }

  @ViewChild('modalButtonElementReference', { read: ElementRef, static: false }) modalButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('selectTeacherComponentReference', { read: SelectTeacherComponent, static: false }) selectTeacher!: SelectTeacherComponent;

  subjectTeachersGridData: any[] = [];

  selectedTeacherId = "";
  selectedTeacherData = {};

  deleteId = "";

  isFetchingGridData = false;
  isTeacherDeleting = false;

  ngOnInit(): void {
    this.getSubjectSubjectTeacher();
  }

  getSubjectSubjectTeacher(){
    this.isFetchingGridData = true;

    // this.subjectsApi.getSubjectSubjectTeacher()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isFetchingGridData = false;
    //       this.subjectTeachersGridData = res.docs;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  createSubjectTeacher(teacherData: any){
    // let data: SubjectTeacher = {
    //   subject: sessionStorage.getItem('school_subject_id') as string,
    //   teacher: {
    //     id: teacherData.id,
    //     data: {

    //     }
    //   }
    // }

    // this.subjectsApi.createSubjectTeacher(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);

    //       if(res.id){
    //         this.getSubjectSubjectTeacher();
    //       }
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  deleteSubjectTeacher(){
    this.isTeacherDeleting = true;

    // this.subjectsApi.deleteSubjectTeacher()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isTeacherDeleting = false;
    //       this.getSubjectSubjectTeacher();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isTeacherDeleting = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  openTeacherWindow(){
    console.log("You are opening select teacher window")
    // this.selectTeacher.openModal();
  }

  onTeacherSelected(teacherData: any){
    console.log(teacherData);

    this.selectedTeacherId = teacherData.id;
    this.selectedTeacherData = teacherData.data();
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.modalButton.nativeElement.click();
  }

}
