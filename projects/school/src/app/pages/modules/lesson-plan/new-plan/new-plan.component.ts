import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PlanFormComponent } from '../plan-form/plan-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { LessonPlanApiService } from 'projects/school/src/app/services/modules-api/lesson-plan-api/lesson-plan-api.service';

import { LessonPlan } from 'projects/school/src/app/models/modules/lesson-plan/lesson-plan.model';


@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.scss']
})
export class NewPlanComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private lessonPlanApi: LessonPlanApiService
  ) { }

  @ViewChild('planFormComponentReference', { read: PlanFormComponent, static: false }) planForm!: PlanFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Plan", url: "/home/lesson-plan/new-plan" },
  ];

  isPlanSaving = false;

  ngOnInit(): void {
    this.getNewLessonPlanCodeConfig();
  }

  ngAfterViewInit(): void {
    let activeTerm = JSON.parse(String(localStorage.getItem('schoolActiveTerm')));
    
    this.planForm.selectedTermId = activeTerm.term.id
    this.planForm.planForm.controls.term.setValue(activeTerm.term.term_name);
  }

  postLessonPlan(){
    console.log('u are saving a new plan');

    let data: LessonPlan = {
      account: this.customCookie.getCookie('school_id') as string,
      plan_code: this.planForm.planForm.controls.planCode.value as string,
      plan_name: this.planForm.planForm.controls.planName.value as string,
      plan_date: this.planForm.planForm.controls.planDate.value,
      term: this.planForm.selectedTermId,
      subject: this.planForm.selectedSubjectId,
      teacher: this.planForm.selectedTeacherId,
      objectives: "",
      materials: "",
      introduction: "",
      main_activity: "",
      closure: "",
      assessment: "",
    }

    console.log(data);
    this.isPlanSaving = true;

    this.lessonPlanApi.postLessonPlan(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isPlanSaving = false;

          sessionStorage.setItem('school_lesson_plan_id', res.id);
          this.router.navigateByUrl('/home/lesson-plan/view-plan');
        },
        error: (err) => {
          console.log(err);
          this.isPlanSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  getNewLessonPlanCodeConfig(){
    this.lessonPlanApi.getNewLessonPlanCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code){
            this.planForm.planForm.controls.planCode.disable();
            this.planForm.planForm.controls.planCode.setValue(res.code);
          }
          else{
            this.planForm.planForm.controls.planCode.enable();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
