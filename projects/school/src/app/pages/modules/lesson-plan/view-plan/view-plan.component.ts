import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PlanFormComponent } from '../plan-form/plan-form.component';
import { PlanSheetComponent } from '../plan-sheet/plan-sheet.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { DeleteModalComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal/delete-modal.component'

// import { LessonPlanApiService } from 'projects/school/src/app/services/modules/lesson-plan-api/lesson-plan-api.service';
// import { LessonPlanPrintService } from 'projects/school/src/app/services/printing/lesson-plan-print/lesson-plan-print.service';

// import { LessonPlan } from 'projects/school/src/app/models/modules/lesson-plan/lesson-plan.model';


@Component({
  selector: 'app-view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.scss']
})
export class ViewPlanComponent implements OnInit {

  constructor(
    private router: Router,
    // private lessonPlanApi: LessonPlanApiService,
    // private plansPrint: PlansPrintService,
  ) { }

  @ViewChild('planFormComponentReference', { read: PlanFormComponent, static: false }) planForm!: PlanFormComponent;
  @ViewChild('planSheetComponentReference', { read: PlanSheetComponent, static: false }) planSheet!: PlanSheetComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('deleteModalComponentReference', { read: DeleteModalComponent, static: false }) deleteModal!: DeleteModalComponent;

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

    // this.lessonPlanApi.getLessonPlan()
    //   .then(
    //     (res: any) => {
    //       console.log(res.data());
    //       this.planData = res;
    //       this.isPlanLoading = false;

    //       this.planForm.planForm.controls.planCode.setValue(this.planData.data().plan_code);
    //       this.planForm.planForm.controls.planName.setValue(this.planData.data().plan_name);
    //       this.planForm.planForm.controls.term.setValue(this.planData.data().term.data.term_name);
    //       this.planForm.planForm.controls.subject.setValue(this.planData.data().subject.data.subject_name);
    //       this.planForm.planForm.controls.teacher.setValue(this.planData.data().teacher.data.teacher_name);

    //       this.planForm.selectedTermId = this.planData.data().term.id;
    //       this.planForm.selectedTermData = this.planData.data().term.data;
    //       this.planForm.selectedSubjectId = this.planData.data().subject.id;
    //       this.planForm.selectedSubjectData = this.planData.data().subject.data;
    //       this.planForm.selectedTeacherId = this.planData.data().teacher.id;
    //       this.planForm.selectedTeacherData = this.planData.data().teacher.data;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isPlanLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateLessonPlan(){
    console.log('u are saving a new plan');

    var data = {
      plan_code: this.planForm.planForm.controls.planCode.value,
      plan_name: this.planForm.planForm.controls.planName.value,
      plan_date: this.planForm.planForm.controls.planDate.value,
      term: this.planForm.selectedTermId,        
      subject: this.planForm.selectedSubjectId,
      teacher: this.planForm.selectedTeacherId,
      objectives: this.planSheet.sheetForm.controls.objectives.value,
      materials: this.planSheet.sheetForm.controls.materials.value,
      introduction: this.planSheet.sheetForm.controls.introduction.value,
      main_activity: this.planSheet.sheetForm.controls.mainActivity.value,
      closure: this.planSheet.sheetForm.controls.closure.value,
      assessment: this.planSheet.sheetForm.controls.assessment.value,
    }

    console.log(data);
    this.isPlanSaving = true;

    // this.lessonPlanApi.updateLessonPlan(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isPlanSaving = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isPlanSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  confirmDelete(){
    // this.deleteModal.openModal();
  }

  deleteLessonPlan(){
    this.isPlanDeleting = true;

    // this.lessonPlanApi.deleteLessonPlan()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/plans/all-plans');
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  onPrint(){
    console.log("lets start printing...");
    // this.plansPrint.printViewPlan();
  }

}
