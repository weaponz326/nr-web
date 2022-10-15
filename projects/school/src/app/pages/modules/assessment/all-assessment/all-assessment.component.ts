import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { NewAssessmentComponent } from '../new-assessment/new-assessment.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
// import { AssessmentApiService } from 'projects/school/src/app/services/modules/assessment-api/assessment-api.service';
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
    // private assessmentApi: AssessmentApiService,
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
    this.getAccountAssessment();
  }

  getActiveTerm(){
    // this.activeTermName = this.activeTerm.getActiveTerm().data.term_name;
  }

  getAccountAssessment(){
    this.isFetchingGridData = true;

    // this.assessmentApi.getAccountAssessment(this.sortParams, 20)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.assessmentGridData = res.docs;
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
    this.getAccountAssessment();

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
    this.getAccountAssessment();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.assessmentPrint.printAllAssessment();
  }

}
