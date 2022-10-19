import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { AssessmentFormComponent } from '../assessment-form/assessment-form.component';
import { AssessmentSheetComponent } from '../assessment-sheet/assessment-sheet.component';
import { AssessmentClassesComponent } from '../assessment-classes/assessment-classes.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AssessmentApiService } from 'projects/school/src/app/services/modules-api/assessment-api/assessment-api.service';
// import { AssessmentPrintService } from 'projects/school/src/app/services/printing/assessment-print/assessment-print.service';

import { Assessment } from 'projects/school/src/app/models/modules/assessment/assessment.model';


@Component({
  selector: 'app-view-assessment',
  templateUrl: './view-assessment.component.html',
  styleUrls: ['./view-assessment.component.scss']
})
export class ViewAssessmentComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private assessmentApi: AssessmentApiService,
    // private assessmentPrint: AssessmentPrintService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
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

    this.assessmentApi.getAssessment()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.assessmentFormData = res;
          this.isAssessmentLoading = false;

          this.assessmentForm.assessmentForm.controls.assessmentCode.setValue(this.assessmentFormData.assessment_code);
          this.assessmentForm.assessmentForm.controls.assessmentName.setValue(this.assessmentFormData.assessment_name);
          this.assessmentForm.assessmentForm.controls.assessmentDate.setValue(this.assessmentFormData.assessment_date);

          this.assessmentForm.selectedTermId = this.assessmentFormData.term.id;
          this.assessmentForm.assessmentForm.controls.term.setValue(this.assessmentFormData.term.term_name);
          this.assessmentForm.selectedSubjectId = this.assessmentFormData.subject.id;
          this.assessmentForm.assessmentForm.controls.subject.setValue(this.assessmentFormData.subject.subject_name);
          this.assessmentForm.selectedClassId = this.assessmentFormData.clase.id;
          this.assessmentForm.assessmentForm.controls.clase.setValue(this.assessmentFormData.clase.subject_name);
        },
        error: (err) => {
          console.log(err);
          this.isAssessmentLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putAssessment(){
    let data: Assessment = {
      account: this.customCookie.getCookie('school_id') as string,
      assessment_code: this.assessmentForm.assessmentForm.controls.assessmentCode.value as string,
      assessment_name: this.assessmentForm.assessmentForm.controls.assessmentName.value as string,
      assessment_date: this.assessmentForm.assessmentForm.controls.assessmentDate.value,
      term: this.assessmentForm.selectedTermId,
      subject: this.assessmentForm.selectedSubjectId,
      clase: this.assessmentForm.selectedClassId
    }

    console.log(data);
    this.isAssessmentSaving = true;

    this.assessmentApi.putAssessment(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isAssessmentSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isAssessmentSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    // this.deleteModal.openModal();
  }

  deleteAssessment(){
    this.isAssessmentDeleting = true;

    this.assessmentApi.deleteAssessment()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/assessment/all-assessment');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  refreshSheet(){
    // this.assessmentTable.getAssessmentAssessmentSheet();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.assessmentPrint.printViewAssessment();
  }

}
