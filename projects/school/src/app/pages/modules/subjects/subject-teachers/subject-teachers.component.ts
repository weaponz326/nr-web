import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'
import { SelectTeacherComponent } from '../../../../components/select-windows/teachers-windows/select-teacher/select-teacher.component';

import { SubjectsApiService } from 'projects/school/src/app/services/modules-api/subjects-api/subjects-api.service';
import { SubjectTeacher } from 'projects/school/src/app/models/modules/subjects/subjects.model';


@Component({
  selector: 'app-subject-teachers',
  templateUrl: './subject-teachers.component.html',
  styleUrls: ['./subject-teachers.component.scss']
})
export class SubjectTeachersComponent implements OnInit {

  constructor(
    private router: Router,
    private subjectsApi: SubjectsApiService,
  ) { }

  @ViewChild('modalButtonElementReference', { read: ElementRef, static: false }) modalButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  @ViewChild('selectTeacherComponentReference', { read: SelectTeacherComponent, static: false }) selectTeacher!: SelectTeacherComponent;

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

    this.subjectsApi.getSubjectSubjectTeacher()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isFetchingGridData = false;
          this.subjectTeachersGridData = res;
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  postSubjectTeacher(teacherData: any){
    let data: SubjectTeacher = {
      subject: sessionStorage.getItem('school_subject_id') as string,
      teacher: teacherData.id,
    }

    this.subjectsApi.postSubjectTeacher(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getSubjectSubjectTeacher();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  deleteSubjectTeacher(){
    this.isTeacherDeleting = true;

    this.subjectsApi.deleteSubjectTeacher(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isTeacherDeleting = false;
          this.getSubjectSubjectTeacher();
        },
        error: (err) => {
          console.log(err);
          this.isTeacherDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  openTeacherWindow(){
    console.log("You are opening select teacher window")
    this.selectTeacher.openModal();
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
