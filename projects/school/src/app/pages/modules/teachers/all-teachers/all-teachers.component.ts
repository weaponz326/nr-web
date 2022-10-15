import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
// import { TeachersApiService } from 'projects/school/src/app/services/modules/teachers-api/teachers-api.service';
// import { TeachersPrintService } from 'projects/school/src/app/services/printing/teachers-print/teachers-print.service';


@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.scss']
})
export class AllTeachersComponent implements OnInit {

  constructor(
    private router: Router,
    // private activeTerm: ActiveTermService,
    // private teachersApi: TeachersApiService,
    // private teachersPrint: TeachersPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "All Teachers", url: "/home/teachers/all-teachers" },
  ];

  activeTermName: any;

  teachersGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getActiveTerm();
    this.getAccountTeacher();
  }

  getActiveTerm(){
    // this.activeTermName = this.activeTerm.getActiveTerm().data.term_name;
  }

  getAccountTeacher(){
    this.isFetchingGridData = true;

    // this.teachersApi.getAccountTeacher(this.sortParams, 20)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.teachersGridData = res.docs;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountTeacher();

    this.currentSortColumn = column;
  }


  viewTeacher(teacherId: any){
    console.log(teacherId);

    sessionStorage.setItem('school_teacher_id', teacherId);
    this.router.navigateByUrl('/home/teachers/view-teacher');
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    // this.activeTerm.setActiveTerm(termData);
    this.getActiveTerm();
    this.getAccountTeacher();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.teachersPrint.printAllTeachers();
  }

}
