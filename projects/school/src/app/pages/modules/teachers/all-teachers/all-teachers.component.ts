import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
import { TeachersApiService } from 'projects/school/src/app/services/modules-api/teachers-api/teachers-api.service';
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
    private teachersApi: TeachersApiService,
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
    this.getAccountTeacher(1, 20, "-created_at");
  }

  getActiveTerm(){
    // this.activeTermName = this.activeTerm.getActiveTerm().data.term_name;
  }

  getAccountTeacher(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.teachersApi.getAccountTeacher(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.teachersGridData = res.results;

          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;

          this.isFetchingGridData = false;
          if(this.totalItems == 0)
            this.isDataAvailable = false
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountTeacher(1, 20, column);

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
    this.getAccountTeacher(1, 20, "-created_at");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.teachersPrint.printAllTeachers();
  }

}
