import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';
import { TasksApiService } from 'projects/personal/src/app/services/modules-api/tasks-api/tasks-api.service';

import { TaskGroup } from 'projects/personal/src/app/models/modules/tasks/tasks.model';


@Component({
  selector: 'app-view-task-group',
  templateUrl: './view-task-group.component.html',
  styleUrls: ['./view-task-group.component.scss']
})
export class ViewTaskGroupComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private tasksApi: TasksApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Task Groups", url: "/home/tasks/all-task-groups" },
    { text: "View Task Group", url: "/home/tasks/view-task-group" },
  ];

  taskGroupFormData: any;

  isTaskGroupLoading: boolean = false;
  isTaskGroupSaving: boolean = false;

  taskGroupForm = new FormGroup({
    taskGroupName: new FormControl('')
  })

  ngOnInit(): void {
    this.getTaskGroup();
  }

  getTaskGroup(){
    this.isTaskGroupLoading = true;

    this.tasksApi.getTaskGroup()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.taskGroupFormData = res;
          this.taskGroupForm.controls.taskGroupName.setValue(res.task_group);
          this.isTaskGroupLoading = false;
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isTaskGroupLoading = false;
          console.log(err);
        }
      })
  }

  updateTaskGroup(){
    let data: TaskGroup = {
      user: this.customCookie.getCookie('personal_id') as string,
      task_group: this.taskGroupForm.controls.taskGroupName.value as string,
    }

    console.log(data);
    
    this.isTaskGroupSaving = true;

    this.tasksApi.putTaskGroup(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isTaskGroupSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isTaskGroupSaving = false;
        }
      })
  }

}
