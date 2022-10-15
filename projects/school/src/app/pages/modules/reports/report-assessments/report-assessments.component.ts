import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { DeleteModalComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal/delete-modal.component'
// import { SelectAssessmentComponent } from '../../../select-windows/assessment-windows/select-assessment/select-assessment.component';

// import { ReportsApiService } from 'projects/school/src/app/services/modules/reports-api/reports-api.service';
// import { ReportAssessment } from 'projects/school/src/app/models/modules/reports/reports.model';


@Component({
  selector: 'app-report-assessments',
  templateUrl: './report-assessments.component.html',
  styleUrls: ['./report-assessments.component.scss']
})
export class ReportAssessmentsComponent implements OnInit {

  constructor(
    private router: Router,
    // private reportsApi: ReportsApiService,
  ) { }

  @Output() assessmentSelected = new EventEmitter<any>();

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalComponent, static: false }) deleteModal!: DeleteModalComponent;
  // @ViewChild('selectAssessmentComponentReference', { read: SelectAssessmentComponent, static: false }) selectAssessment!: SelectAssessmentComponent;

  reportAssessmentsGridData: any[] = [];

  deleteId = "";

  isFetchingGridData = false;
  isAssessmentDeleting = false;

  ngOnInit(): void {
    this.getReportReportAssessment();
  }

  getReportReportAssessment(){
    this.isFetchingGridData = true;

    // this.reportsApi.getReportReportAssessment()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isFetchingGridData = false;
    //       this.reportAssessmentsGridData = res.docs;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  createReportAssessment(assessmentData: any){
    // let data: ReportAssessment = {
    //   report: sessionStorage.getItem('school_report_id') as string,
    //   assessment: assessmentData.id,
    // }

    // this.reportsApi.createReportAssessment(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.getReportReportAssessment();
    //       this.assessmentSelected.emit(assessmentData);
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  deleteReportAssessment(id: any){
    this.isAssessmentDeleting = true;

    // this.reportsApi.deleteReportAssessment()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isAssessmentDeleting = false;
    //       this.getReportReportAssessment();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isAssessmentDeleting = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  confirmDelete(id: any){
    this.deleteId = id;
    // this.deleteModal.openModal();
  }

}
