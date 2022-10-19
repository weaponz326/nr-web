import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AssessmentFormComponent } from '../assessment-form/assessment-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AssessmentApiService } from 'projects/school/src/app/services/modules-api/assessment-api/assessment-api.service';

import { Assessment } from 'projects/school/src/app/models/modules/assessment/assessment.model';


@Component({
  selector: 'app-new-assessment',
  templateUrl: './new-assessment.component.html',
  styleUrls: ['./new-assessment.component.scss']
})
export class NewAssessmentComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private assessmentApi: AssessmentApiService
  ) { }

  @ViewChild('assessmentFormComponentReference', { read: AssessmentFormComponent, static: false }) assessmentForm!: AssessmentFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Assessment", url: "/home/assessment/new-assessment" },
  ];

  isAssessmentSaving = false;

  ngOnInit(): void {
    this.getNewAssessmentCodeConfig();
  }

  postAssessment(){
    let data: Assessment = {
      account: this.customCookie.getCookie('school_id') as string,
      assessment_code: this.assessmentForm.assessmentForm.controls.assessmentCode.value as string,
      assessment_name: this.assessmentForm.assessmentForm.controls.assessmentName.value as string,
      assessment_date: this.assessmentForm.assessmentForm.controls.assessmentDate.value,
      term: this.assessmentForm.selectedTermId,
      subject: this.assessmentForm.selectedSubjectId,
      clase: this.assessmentForm.selectedClassId
    }

    // if(this.assessmentForm.selectedClassId != ""){
      this.isAssessmentSaving = true;

      this.assessmentApi.postAssessment(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            sessionStorage.setItem('school_assessment_id', res.id);

            this.router.navigateByUrl('/home/assessment/view-assessment');
            this.isAssessmentSaving = true;
          },
          error: (err) => {
            console.log(err);
            this.isAssessmentSaving = true;
            this.connectionToast.openToast();
          }
        })
    // }
  }

  getNewAssessmentCodeConfig(){
    this.assessmentApi.getNewAssessmentCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.assessmentForm.assessmentForm.controls.assessmentCode.disable();

          if(res.code)
            this.assessmentForm.assessmentForm.controls.assessmentCode.setValue(res.code);
          else
            this.assessmentForm.assessmentForm.controls.assessmentCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
