import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { TasksApiService } from 'projects/personal/src/app/services/modules-api/tasks-api/tasks-api.service';
import { TasksPrintService } from 'projects/personal/src/app/services/modules-printing/tasks-print/tasks-print.service';

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

  navHeading: any[] = [
    { text: "All Task Items", url: "/home/tasks/all-task-items" },
  ];

  taskItemsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
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

  sortTable(column: any){
    console.log(column);
    this.getUserTaskItems(1, 20, column);

    this.currentSortColumn = column;
  }

  onPrint(){
    console.log("lets start printing...");
    this.tasksPrint.printAllTaskItems();
  }

}
