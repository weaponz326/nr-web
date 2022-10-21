import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'
// import { SelectStudentComponent } from '../../../select-windows/students-windows/select-student/select-student.component';

import { SectionsApiService } from 'projects/school/src/app/services/modules-api/sections-api/sections-api.service';
import { SectionStudent } from 'projects/school/src/app/models/modules/sections/sections.model';


@Component({
  selector: 'app-section-students',
  templateUrl: './section-students.component.html',
  styleUrls: ['./section-students.component.scss']
})
export class SectionStudentsComponent implements OnInit {

  constructor(
    private router: Router,
    private sectionsApi: SectionsApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  // @ViewChild('selectStudentComponentReference', { read: SelectStudentComponent, static: false }) selectStudent!: SelectStudentComponent;

  classStudentsGridData: any[] = [];

  deleteId = "";

  isFetchingGridData = false;
  isStudentDeleting = false;

  ngOnInit(): void {
    this.getSectionSectionStudent();
  }

  getSectionSectionStudent(){
    this.isFetchingGridData = true;

    this.sectionsApi.getSectionSectionStudent()
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

  postSectionStudent(studentData: any){
    let data: SectionStudent = {
      section: sessionStorage.getItem('school_section_id') as string,
      student: studentData.id,
    }

    this.sectionsApi.postSectionStudent(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getSectionSectionStudent();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  deleteSectionStudent(){
    this.isStudentDeleting = true;

    this.sectionsApi.deleteSectionStudent(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isStudentDeleting = false;
          this.getSectionSectionStudent();
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
