import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { ReportsApiService } from 'projects/school/src/app/services/modules/reports-api/reports-api.service';
// import { AssessmentApiService } from 'projects/school/src/app/services/modules/assessment-api/assessment-api.service';


@Component({
  selector: 'app-class-sheet',
  templateUrl: './class-sheet.component.html',
  styleUrls: ['./class-sheet.component.scss']
})
export class ClassSheetComponent implements OnInit {

  constructor(
    // private reportsApi: ReportsApiService,
    // private assessmentApi: AssessmentApiService,
  ) { }

    Object = Object;

  reportSheetData: any;
  assessmentData: any

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  ngOnInit(): void {
    this.getReportSheet();
  }

  getReportSheet(){
    // this.reportsApi.getReportSheet()
    //   .then(
    //     (res: any) => {
    //       console.log(res.data());
    //       this.reportSheetData = res.data().sheet;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateReportSheet(){
    let data = { sheet: this.reportSheetData }

    // this.reportsApi.updateReportSheet(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res.data());
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  getAssessmentSheet(){
    sessionStorage.setItem('school_assessment_id', this.assessmentData.id);

    // this.assessmentApi.getAssessmentSheet()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.setReportAssessment(res.data());
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  // TODO:
  setReportAssessment(assessmentSheet: any){
    assessmentSheet.forEach((assessmentRow: any) => {
      this.reportSheetData.forEach((reportRow: any, index: number) => {
        if (assessmentRow.student.id == reportRow.student.id){
          let assessment = {
            assessment_code: this.assessmentData.data.assessment_code,
            assessment_name: this.assessmentData.data.assessment_name,
            score: assessmentRow.score,
            grade: assessmentRow.grade,
            remarks: assessmentRow.score,
          }

          // TODO: data structure here is messed up
          this.reportSheetData[index].assessment = assessment;
          this.updateReportSheet();
        }
      })
    })
  }

}
