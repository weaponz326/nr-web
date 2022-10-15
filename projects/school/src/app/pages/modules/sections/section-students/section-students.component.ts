import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { SelectStudentComponent } from '../../../select-windows/students-windows/select-student/select-student.component';

// import { SectionsApiService } from 'projects/school/src/app/services/modules/sections-api/sections-api.service';
// import { SectionStudent } from 'projects/school/src/app/models/modules/sections/sections.model';


@Component({
  selector: 'app-section-students',
  templateUrl: './section-students.component.html',
  styleUrls: ['./section-students.component.scss']
})
export class SectionStudentsComponent implements OnInit {

  constructor(
    private router: Router,
    // private sectionsApi: SectionsApiService,
  ) { }

  @ViewChild('modalButtonElementReference', { read: ElementRef, static: false }) modalButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('selectStudentComponentReference', { read: SelectStudentComponent, static: false }) selectStudent!: SelectStudentComponent;

  classStudentsGridData: any[] = [];

  deleteId = "";

  isFetchingGridData = false;
  isStudentDeleting = false;

  sortParams = {
    field: "student.data.student_name",
    direction: "desc"
  }

  ngOnInit(): void {
    this.getSectionSectionStudent();
  }

  getSectionSectionStudent(){
    this.isFetchingGridData = true;

    // this.sectionsApi.getSectionSectionStudent(this.sortParams, 20)
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

  createSectionStudent(studentData: any){
    // let data: SectionStudent = {
    //   section: sessionStorage.getItem('school_section_id') as string,
    //   student: studentData.id,
    // }

    // this.sectionsApi.createSectionStudent(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);

    //       if(res.id){
    //         this.getSectionSectionStudent();
    //       }
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  deleteSectionStudent(){
    this.isStudentDeleting = true;

    // this.sectionsApi.deleteSectionStudent()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isStudentDeleting = false;
    //       this.getSectionSectionStudent();
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
