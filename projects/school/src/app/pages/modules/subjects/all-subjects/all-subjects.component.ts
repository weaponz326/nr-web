import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
import { SubjectsApiService } from 'projects/school/src/app/services/modules-api/subjects-api/subjects-api.service';
// import { SubjectsPrintService } from 'projects/school/src/app/services/printing/subjects-print/subjects-print.service';


@Component({
  selector: 'app-all-subjects',
  templateUrl: './all-subjects.component.html',
  styleUrls: ['./all-subjects.component.scss']
})
export class AllSubjectsComponent implements OnInit {

  constructor(
    private router: Router,
    // private activeTerm: ActiveTermService,
    private subjectsApi: SubjectsApiService,
    // private subjectsPrint: SubjectsPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "All Subjects", url: "/home/subjects/all-subjects" },
  ];

  activeTermName: any;

  subjectsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getActiveTerm();
    this.getAccountSubject(1, 20, "-created_at");
  }

  getActiveTerm(){
    // this.activeTermName = this.activeTerm.getActiveTerm().data.term_name;
  }

  getAccountSubject(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.subjectsApi.getAccountSubject(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.subjectsGridData = res.results;

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
    this.getAccountSubject(1, 20, column);

    this.currentSortColumn = column;
  }

  viewSubject(subjectId: any){
    console.log(subjectId);

    sessionStorage.setItem('school_subject_id', subjectId);
    this.router.navigateByUrl('/home/subjects/view-subject');
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    // this.activeTerm.setActiveTerm(termData);
    this.getActiveTerm();
    this.getAccountSubject(1, 20, '-created_at');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.subjectsPrint.printAllSubjects();
  }

}
