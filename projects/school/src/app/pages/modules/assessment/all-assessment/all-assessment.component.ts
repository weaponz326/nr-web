import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { NewAssessmentComponent } from '../new-assessment/new-assessment.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
import { AssessmentApiService } from 'projects/school/src/app/services/modules-api/assessment-api/assessment-api.service';
// import { AssessmentPrintService } from 'projects/school/src/app/services/printing/assessment-print/assessment-print.service';


@Component({
  selector: 'app-all-assessment',
  templateUrl: './all-assessment.component.html',
  styleUrls: ['./all-assessment.component.scss']
})
export class AllAssessmentComponent implements OnInit {

  constructor(
    private router: Router,
    // private activeTerm: ActiveTermService,
    private assessmentApi: AssessmentApiService,
    // private assessmentPrint: AssessmentPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newAssessmentComponentReference', { read: NewAssessmentComponent, static: false }) newAssessment!: NewAssessmentComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "All Assessment", url: "/home/assessment/all-assessment" },
  ];

  activeTermName: any;

  assessmentGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getActiveTerm();
    this.getAccountAssessment(1, 20, "-created_at");
  }

  getActiveTerm(){
    // this.activeTermName = this.activeTerm.getActiveTerm().data.term_name;
  }

  getAccountAssessment(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.assessmentApi.getAccountAssessment(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.assessmentGridData = res.results;

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
    this.getAccountAssessment(1, 20, column);

    this.currentSortColumn = column;
  }

  viewAssessment(assessmentId: any){
    console.log(assessmentId);

    sessionStorage.setItem('school_assessment_id', assessmentId);
    this.router.navigateByUrl('/home/assessment/view-assessment');
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    // this.activeTerm.setActiveTerm(termData);
    this.getActiveTerm();
    this.getAccountAssessment(1, 20, "-created_at");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.assessmentPrint.printAllAssessment();
  }

}
