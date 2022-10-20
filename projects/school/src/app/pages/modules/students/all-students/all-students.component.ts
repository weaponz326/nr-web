import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
import { StudentsApiService } from 'projects/school/src/app/services/modules-api/students-api/students-api.service';
// import { StudentsPrintService } from 'projects/school/src/app/services/printing/students-print/students-print.service';


@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class AllStudentsComponent implements OnInit {

  constructor(
    private router: Router,
    // private activeTerm: ActiveTermService,
    private studentsApi: StudentsApiService,
    // private studentsPrint: StudentsPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "All Students", url: "/home/students/all-students" },
  ];

  activeTermName: any;

  studentsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getActiveTerm();
    this.getAccountStudent(1, 20, "-created_at");
  }

  getActiveTerm(){
    // this.activeTermName = this.activeTerm.getActiveTerm().data.term_name;
  }

  getAccountStudent(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.studentsApi.getAccountStudent(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.studentsGridData = res.results;

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
    this.getAccountStudent(1, 20, column);

    this.currentSortColumn = column;
  }

  viewStudent(studentId: any){
    console.log(studentId);

    sessionStorage.setItem('school_student_id', studentId);
    this.router.navigateByUrl('/home/students/view-student');
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    // this.activeTerm.setActiveTerm(termData);
    this.getActiveTerm();
    this.getAccountStudent(1, 20, '-created_at');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.studentsPrint.printAllStudents();
  }

}
