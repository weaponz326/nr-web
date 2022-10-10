import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { DeleteModalComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal/delete-modal.component'

// import { AssessmentApiService } from 'projects/school/src/app/services/modules/assessment-api/assessment-api.service';
// import { AssessmentSheet } from 'projects/school/src/app/models/modules/assessment/assessment.model';


@Component({
  selector: 'app-assessment-sheet',
  templateUrl: './assessment-sheet.component.html',
  styleUrls: ['./assessment-sheet.component.scss']
})
export class AssessmentSheetComponent implements OnInit {

  constructor(
    // private assessmentApi: AssessmentApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalComponent, static: false }) deleteModal!: DeleteModalComponent;

  assessmentTableGridData: any[] = [];


  isFetchingGridData = false;
  isTableSaving = false;

  ngOnInit(): void {
    this.getAssessmentAssessmentSheet();
  }

  getAssessmentAssessmentSheet(){
    this.isFetchingGridData = true;

    // this.assessmentApi.getAssessmentSheet()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isFetchingGridData = false;
    //       this.assessmentTableGridData = res.data().sheet;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateAssessmentSheet(){
    let data = { sheet: this.assessmentTableGridData };

    this.isTableSaving = true;

    // this.assessmentApi.createAssessmentSheet(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.getAssessmentAssessmentSheet();
    //       this.isTableSaving = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isTableSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  onScoreChange(event: any, index: any){
    console.log(event.target.value);
    this.assessmentTableGridData[index].score = event.target.value;
  }

  onGradeChange(event: any, index: any){
    console.log(event.target.value);
    this.assessmentTableGridData[index].grade = event.target.value;
  }

  onRemarksChange(event: any, index: any){
    console.log(event.target.value);
    this.assessmentTableGridData[index].remarks = event.target.value;
  }

}
