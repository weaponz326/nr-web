import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { LessonPlanApiService } from 'projects/school/src/app/services/modules-api/lesson-plan-api/lesson-plan-api.service';


@Component({
  selector: 'app-select-lesson-plan',
  templateUrl: './select-lesson-plan.component.html',
  styleUrls: ['./select-lesson-plan.component.scss']
})
export class SelectLessonPlanComponent implements OnInit {

  constructor(private lessonPlanApi: LessonPlanApiService) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  lessonPlanGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
  }

  openModal(){
    this.lessonPlanGridData = [];
    this.getAccountLessonPlan(1, 20, "-created_at");
    this.openButton.nativeElement.click();
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

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    console.log(row);
  }

}
