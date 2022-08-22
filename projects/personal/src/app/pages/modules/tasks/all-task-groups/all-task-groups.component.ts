import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { NewTaskGroupComponent } from '../new-task-group/new-task-group.component';

import { TasksApiService } from 'projects/personal/src/app/services/modules-api/tasks-api/tasks-api.service';
import { TasksPrintService } from 'projects/personal/src/app/services/printing/tasks-print/tasks-print.service';
import { TableSortingComponent } from 'projects/personal/src/app/components/module-utilities/table-sorting/table-sorting.component';


@Component({
  selector: 'app-all-task-groups',
  templateUrl: './all-task-groups.component.html',
  styleUrls: ['./all-task-groups.component.scss']
})
export class AllTaskGroupsComponent implements OnInit {

  constructor(
    private router: Router,
    private tasksApi: TasksApiService,
    private tasksPrint: TasksPrintService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newTaskGroupComponentReference', { read: NewTaskGroupComponent, static: false }) newTaskGroup!: NewTaskGroupComponent;

  @ViewChild('taskGroupSortingComponentReference', { read: TableSortingComponent, static: false }) taskGroupSorting!: TableSortingComponent;
  @ViewChild('createdAtSortingComponentReference', { read: TableSortingComponent, static: false }) createdAtSorting!: TableSortingComponent;

  navHeading: any[] = [
    { text: "All Task Groups", url: "/home/tasks/all-task-groups" },
  ];

  taskGroupsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  ngOnInit(): void {
    this.getUserTaskGroups(1, 20, "");
  }

  getUserTaskGroups(page: any, size: any, sortField: any){
    this.isFetchingGridData =  true;

    this.tasksApi.getUserTaskGroups(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.taskGroupsGridData = res.results;
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

  viewTaskGroup(id: any){
    console.log(id);

    sessionStorage.setItem('personal_task_group_id', id);
    this.router.navigateByUrl('/home/tasks/view-task-group/kanban-view')
  }

  sortTable(field: any){
    console.log(field);
    this.getUserTaskGroups(1, 20, field);

    if((field == 'task_group') || (field == "-task_group")){
      this.createdAtSorting.resetSort();
    }
    else if((field == 'created_at') || (field == "-created_at")){
      this.taskGroupSorting.resetSort();
    }
  }

  onPrint(){
    console.log("lets start printing...");
    // this.tasksPrint.printAllTaskGroups();
  }

}
