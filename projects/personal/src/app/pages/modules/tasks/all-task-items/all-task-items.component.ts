import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { TableSortingComponent } from 'projects/personal/src/app/components/module-utilities/table-sorting/table-sorting.component';

import { TasksApiService } from 'projects/personal/src/app/services/modules-api/tasks-api/tasks-api.service';
import { TasksPrintService } from 'projects/personal/src/app/services/printing/tasks-print/tasks-print.service';

@Component({
  selector: 'app-all-task-items',
  templateUrl: './all-task-items.component.html',
  styleUrls: ['./all-task-items.component.scss']
})
export class AllTaskItemsComponent implements OnInit {

  constructor(
    private tasksApi: TasksApiService,
    private tasksPrint: TasksPrintService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  @ViewChild('taskItemSortingComponentReference', { read: TableSortingComponent, static: false }) taskItemSorting!: TableSortingComponent;
  @ViewChild('prioritySortingComponentReference', { read: TableSortingComponent, static: false }) prioritySorting!: TableSortingComponent;
  @ViewChild('startDateSortingComponentReference', { read: TableSortingComponent, static: false }) startDateSorting!: TableSortingComponent;
  @ViewChild('endDateSortingComponentReference', { read: TableSortingComponent, static: false }) endDateSorting!: TableSortingComponent;
  @ViewChild('statusSortingComponentReference', { read: TableSortingComponent, static: false }) statusSorting!: TableSortingComponent;
  @ViewChild('taskGroupSortingComponentReference', { read: TableSortingComponent, static: false }) taskGroupSorting!: TableSortingComponent;

  navHeading: any[] = [
    { text: "All Task Items", url: "/home/tasks/all-task-items" },
  ];

  taskItemsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getUserTaskItems(1, 20, "");
  }

  getUserTaskItems(page: any, size: any, sortField: any){
    this.isFetchingGridData =  true;

    this.tasksApi.getUserTaskItems(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.taskItemsGridData = res.results;
          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;

          this.isFetchingGridData = false;
          if(this.totalItems == 0)
            this.isDataAvailable = false
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isFetchingGridData = false;
          console.log(err);
        }
      })
  }

  sortTable(field: any){
    console.log(field);
    this.getUserTaskItems(1, 20, field);

    if((field == 'task_item') || (field == "-task_item")){
      this.prioritySorting.resetSort();
      this.startDateSorting.resetSort();
      this.endDateSorting.resetSort();
      this.statusSorting.resetSort();
    }
    else if((field == 'priority') || (field == "-priority")){
      this.taskItemSorting.resetSort();
      this.startDateSorting.resetSort();
      this.endDateSorting.resetSort();
      this.statusSorting.resetSort();
    }
    else if((field == 'start_date') || (field == "-start_date")){
      this.taskItemSorting.resetSort();
      this.prioritySorting.resetSort();
      this.endDateSorting.resetSort();
      this.statusSorting.resetSort();
    }
    else if((field == 'end_date') || (field == "-end_date")){
      this.taskItemSorting.resetSort();
      this.prioritySorting.resetSort();
      this.startDateSorting.resetSort();
      this.statusSorting.resetSort();
    }
    else if((field == 'status') || (field == "-status")){
      this.taskItemSorting.resetSort();
      this.prioritySorting.resetSort();
      this.startDateSorting.resetSort();
      this.endDateSorting.resetSort();
    }
  }

  onPrint(){
    console.log("lets start printing...");
    // this.tasksPrint.getPrintAllTaskItems(this.totalItems);
  }

}
