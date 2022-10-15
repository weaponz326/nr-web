import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AssessmentFormComponent } from '../assessment-form/assessment-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { AssessmentApiService } from 'projects/school/src/app/services/modules/assessment-api/assessment-api.service';
// import { Assessment } from 'projects/school/src/app/models/modules/assessment/assessment.model';


@Component({
  selector: 'app-new-assessment',
  templateUrl: './new-assessment.component.html',
  styleUrls: ['./new-assessment.component.scss']
})
export class NewAssessmentComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private assessmentApi: AssessmentApiService
  ) { }

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('assessmentFormComponentReference', { read: AssessmentFormComponent, static: false }) assessmentForm!: AssessmentFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Assessment", url: "/home/assessment/new-assessment" },
  ];

  isAssessmentSaving = false;

  ngOnInit(): void {
  }

  createAssessment(){
    // let data: Assessment = {
    //   account: this.customCookie.getCookie('restaurant_id') as string,
    //   assessment_code: this.assessmentForm.assessmentForm.controls.assessmentCode.value,
    //   assessment_name: this.assessmentForm.assessmentForm.controls.assessmentName.value,
    //   assessment_date: this.assessmentForm.assessmentForm.controls.assessmentDate.value,
    //   term: "",
    //   subject: ""
    //   }
    // }

    this.isAssessmentSaving = true;

    // this.assessmentApi.createAssessment(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       sessionStorage.setItem('school_assessment_id', res.id);
    //       this.createAssessmentSheet();

    //       this.router.navigateByUrl('/home/assessment/view-assessment');
    //       this.dismissButton.nativeElement.click();
    //       this.isAssessmentSaving = true;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isAssessmentSaving = true;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  createAssessmentSheet(){
    let data = { sheet: [] };
    // this.assessmentApi.createAssessmentSheet(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

}
