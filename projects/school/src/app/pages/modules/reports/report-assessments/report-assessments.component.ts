import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'
// import { SelectAssessmentComponent } from '../../../select-windows/assessment-windows/select-assessment/select-assessment.component';

import { ReportsApiService } from 'projects/school/src/app/services/modules-api/reports-api/reports-api.service';
import { ReportAssessment } from 'projects/school/src/app/models/modules/reports/reports.model';


@Component({
  selector: 'app-report-assessments',
  templateUrl: './report-assessments.component.html',
  styleUrls: ['./report-assessments.component.scss']
})
export class ReportAssessmentsComponent implements OnInit {

  constructor(
    private router: Router,
    private reportsApi: ReportsApiService,
  ) { }

  @Output() assessmentSelected = new EventEmitter<any>();

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  // @ViewChild('selectAssessmentComponentReference', { read: SelectAssessmentComponent, static: false }) selectAssessment!: SelectAssessmentComponent;

  reportAssessmentsGridData: any[] = [];

  deleteId = "";

  isFetchingGridData = false;
  isAssessmentDeleting = false;

  ngOnInit(): void {
    this.getReportAssessment();
  }

  getReportAssessment(){
    this.isFetchingGridData = true;

    this.reportsApi.getReportAssessment()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isFetchingGridData = false;
          this.reportAssessmentsGridData = res;
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  postReportAssessment(assessmentData: any){
    let data: ReportAssessment = {
      report: sessionStorage.getItem('school_report_id') as string,
      assessment: assessmentData.id,
    }

    this.reportsApi.postReportAssessment(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getReportAssessment();
          this.assessmentSelected.emit(assessmentData);
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  deleteReportAssessment(id: any){
    this.isAssessmentDeleting = true;

    this.reportsApi.deleteReportAssessment(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isAssessmentDeleting = false;
          this.getReportAssessment();
        },
        error: (err) => {
          console.log(err);
          this.isAssessmentDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
