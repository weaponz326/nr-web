import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { NewPlanComponent } from '../new-plan/new-plan.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
import { LessonPlanApiService } from 'projects/school/src/app/services/modules-api/lesson-plan-api/lesson-plan-api.service';
// import { LessonPlanPrintService } from 'projects/school/src/app/services/printing/lessonPlan-print/lessonPlan-print.service';


@Component({
  selector: 'app-all-plans',
  templateUrl: './all-plans.component.html',
  styleUrls: ['./all-plans.component.scss']
})
export class AllPlansComponent implements OnInit {

  constructor(
    private router: Router,
    // private activeTerm: ActiveTermService,
    private lessonPlanApi: LessonPlanApiService,
    // private lessonPlanPrint: LessonPlanPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newPlanComponentReference', { read: NewPlanComponent, static: false }) newPlan!: NewPlanComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "All Lesson Plans", url: "/home/lesson-plan/all-plans" },
  ];

  activeTermName: any;

  lessonPlanGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getActiveTerm();
    this.getAccountLessonPlan(1, 20, "-created_at");
  }

  getActiveTerm(){
    // this.activeTermName = this.activeTerm.getActiveTerm().data.term_name;
  }

  getAccountLessonPlan(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.lessonPlanApi.getAccountLessonPlan(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.lessonPlanGridData = res.results;

          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;

          this.isFetchingGridData = false;
          if(this.totalItems == 0)
            this.isDataAvailable = false
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountLessonPlan(1, 20, column);

    this.currentSortColumn = column;
  }

  viewLessonPlan(lessonPlanId: any){
    console.log(lessonPlanId);

    sessionStorage.setItem('school_lesson_plan_id', lessonPlanId);
    this.router.navigateByUrl('/home/lesson-plan/view-plan');
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    // this.activeTerm.setActiveTerm(termData);
    this.getActiveTerm();
    this.getAccountLessonPlan(1, 20, "-created_at");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.lessonPlanPrint.printAllLessonPlan();
  }

}
