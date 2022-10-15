import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { DeleteModalComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal/delete-modal.component'
import { AssessmentFormComponent } from '../assessment-form/assessment-form.component';
import { AssessmentSheetComponent } from '../assessment-sheet/assessment-sheet.component';
import { AssessmentClassesComponent } from '../assessment-classes/assessment-classes.component';

// import { AssessmentApiService } from 'projects/school/src/app/services/modules/assessment-api/assessment-api.service';
// import { AssessmentPrintService } from 'projects/school/src/app/services/printing/assessment-print/assessment-print.service';

// import { Assessment } from 'projects/school/src/app/models/modules/assessment/assessment.model';


@Component({
  selector: 'app-view-assessment',
  templateUrl: './view-assessment.component.html',
  styleUrls: ['./view-assessment.component.scss']
})
export class ViewAssessmentComponent implements OnInit {

  constructor(
    private router: Router,
    // private assessmentApi: AssessmentApiService,
    // private assessmentPrint: AssessmentPrintService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('deleteModalComponentReference', { read: DeleteModalComponent, static: false }) deleteModal!: DeleteModalComponent;
  @ViewChild('assessmentFormComponentReference', { read: AssessmentFormComponent, static: false }) assessmentForm!: AssessmentFormComponent;
  @ViewChild('assessmentTableComponentReference', { read: AssessmentSheetComponent, static: false }) assessmentTable!: AssessmentSheetComponent;
  @ViewChild('assessmentClassesComponentReference', { read: AssessmentClassesComponent, static: false }) assessmentClasses!: AssessmentClassesComponent;

  navHeading: any[] = [
    { text: "All Assessment", url: "/home/assessment/all-assessment" },
    { text: "View Assessment", url: "/home/assessment/view-assessment" },
  ];

  assessmentFormData: any;

  isAssessmentLoading = false;
  isAssessmentSaving = false;
  isAssessmentDeleting = false;

  ngOnInit(): void {
    this.getAssessment();
  }

  getAssessment(){
    this.isAssessmentLoading = true;

    // this.assessmentApi.getAssessment()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.assessmentFormData = res;
    //       this.isAssessmentLoading = false;

    //       this.assessmentForm.assessmentForm.controls.assessmentCode.setValue(this.assessmentFormData.data().assessment_code);
    //       this.assessmentForm.assessmentForm.controls.assessmentName.setValue(this.assessmentFormData.data().assessment_name);
    //       this.assessmentForm.assessmentForm.controls.assessmentDate.setValue(this.assessmentFormData.data().assessment_date);

    //       this.assessmentForm.selectedTermId = this.assessmentFormData.data().term.id;
    //       this.assessmentForm.selectedTermData = this.assessmentFormData.data().term.data;
    //       this.assessmentForm.assessmentForm.controls.term.setValue(this.assessmentFormData.data().term.data.term_name);
    //       this.assessmentForm.selectedSubjectId = this.assessmentFormData.data().subject.id;
    //       this.assessmentForm.selectedSubjectData = this.assessmentFormData.data().subject.data;
    //       this.assessmentForm.assessmentForm.controls.subject.setValue(this.assessmentFormData.data().subject.data.subject_name);
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isAssessmentLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateAssessment(){
    let data = {
      assessment_code: this.assessmentForm.assessmentForm.controls.assessmentCode.value,
      assessment_name: this.assessmentForm.assessmentForm.controls.assessmentName.value,
      assessment_date: this.assessmentForm.assessmentForm.controls.assessmentDate.value,
      term: "",
      subject: ""
    }

    console.log(data);
    this.isAssessmentSaving = true;

    // this.assessmentApi.updateAssessment(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isAssessmentSaving = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isAssessmentSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  confirmDelete(){
    // this.deleteModal.openModal();
  }

  deleteAssessment(){
    this.isAssessmentDeleting = true;

    // this.assessmentApi.deleteAssessment()
    //   .then(
    //     (res: any) => {
    //       console.log(res);

    //       this.router.navigateByUrl('/home/assessment/all-assessment');
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  refreshSheet(){
    // this.assessmentTable.getAssessmentAssessmentSheet();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.assessmentPrint.printViewAssessment();
  }

}
