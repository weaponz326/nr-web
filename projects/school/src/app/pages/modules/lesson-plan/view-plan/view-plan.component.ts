import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PlanFormComponent } from '../plan-form/plan-form.component';
import { PlanSheetComponent } from '../plan-sheet/plan-sheet.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { LessonPlanApiService } from 'projects/school/src/app/services/modules-api/lesson-plan-api/lesson-plan-api.service';
// import { LessonPlanPrintService } from 'projects/school/src/app/services/printing/lesson-plan-print/lesson-plan-print.service';

import { LessonPlan } from 'projects/school/src/app/models/modules/lesson-plan/lesson-plan.model';


@Component({
  selector: 'app-view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.scss']
})
export class ViewPlanComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private lessonPlanApi: LessonPlanApiService,
    // private plansPrint: PlansPrintService,
  ) { }

  @ViewChild('planFormComponentReference', { read: PlanFormComponent, static: false }) planForm!: PlanFormComponent;
  @ViewChild('planSheetComponentReference', { read: PlanSheetComponent, static: false }) planSheet!: PlanSheetComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Plans", url: "/home/lesson-plan/all-plans" },
    { text: "View Plan", url: "/home/lesson-plan/view-plan" },
  ];

  planData: any;

  isPlanLoading = false;
  isPlanSaving = false;
  isPlanDeleting = false;

  ngOnInit(): void {
    this.getLessonPlan();
  }

  getLessonPlan(){
    this.isPlanLoading = true;

    this.lessonPlanApi.getLessonPlan()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.planData = res;
          this.isPlanLoading = false;

          this.planForm.planForm.controls.planCode.setValue(this.planData.plan_code);
          this.planForm.planForm.controls.planName.setValue(this.planData.plan_name);
          this.planForm.planForm.controls.term.setValue(this.planData.term.term_name);
          this.planForm.planForm.controls.subject.setValue(this.planData.subject.subject_name);
          this.planForm.planForm.controls.teacher.setValue(this.planData.teacher.first_name + " " + this.planData.teacher.last_name);
          this.planSheet.sheetForm.controls.objectives.setValue(this.planData.objectives);
          this.planSheet.sheetForm.controls.materials.setValue(this.planData.materials);
          this.planSheet.sheetForm.controls.introduction.setValue(this.planData.introduction);
          this.planSheet.sheetForm.controls.mainActivity.setValue(this.planData.main_activity);
          this.planSheet.sheetForm.controls.closure.setValue(this.planData.closure);
          this.planSheet.sheetForm.controls.assessment.setValue(this.planData.assessment);

          this.planForm.selectedTermId = this.planData.term.id;
          this.planForm.selectedSubjectId = this.planData.subject.id;
          this.planForm.selectedTeacherId = this.planData.teacher.id;
        },
        error: (err) => {
          console.log(err);
          this.isPlanLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putLessonPlan(){
    console.log('u are saving a new plan');

    var data: LessonPlan = {
      account: this.customCookie.getCookie('school_id') as string,
      plan_code: this.planForm.planForm.controls.planCode.value as string,
      plan_name: this.planForm.planForm.controls.planName.value as string,
      plan_date: this.planForm.planForm.controls.planDate.value,
      term: this.planForm.selectedTermId,        
      subject: this.planForm.selectedSubjectId,
      teacher: this.planForm.selectedTeacherId,
      objectives: this.planSheet.sheetForm.controls.objectives.value as string,
      materials: this.planSheet.sheetForm.controls.materials.value as string,
      introduction: this.planSheet.sheetForm.controls.introduction.value as string,
      main_activity: this.planSheet.sheetForm.controls.mainActivity.value as string,
      closure: this.planSheet.sheetForm.controls.closure.value as string,
      assessment: this.planSheet.sheetForm.controls.assessment.value as string,
    }

    console.log(data);
    this.isPlanSaving = true;

    this.lessonPlanApi.putLessonPlan(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isPlanSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isPlanSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteLessonPlan(){
    this.isPlanDeleting = true;

    this.lessonPlanApi.deleteLessonPlan()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/plans/all-plans');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.plansPrint.printViewPlan();
  }

}
