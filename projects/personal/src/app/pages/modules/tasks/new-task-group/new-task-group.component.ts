import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { TasksApiService } from 'projects/personal/src/app/services/modules-api/tasks-api/tasks-api.service';

import { TaskGroup } from 'projects/personal/src/app/models/modules/tasks/tasks.model';


@Component({
  selector: 'app-new-task-group',
  templateUrl: './new-task-group.component.html',
  styleUrls: ['./new-task-group.component.scss']
})
export class NewTaskGroupComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private tasksApi: TasksApiService
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isTaskGroupSaving = false;

  taskGroupForm = new FormGroup({
    taskGroupCode: new FormControl(''),
    taskGroupName: new FormControl('')
  })

  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.getNewTaskGroupCodeConfig();
  }

  createTaskGroup(){
    let data: TaskGroup = {
      user: this.customCookie.getCookie('personal_id') as string,
      task_group_code: this.taskGroupForm.controls.taskGroupCode.value as string,
      task_group: this.taskGroupForm.controls.taskGroupName.value as string,
    }

    console.log(data);

    this.isTaskGroupSaving = true;

    this.tasksApi.postTaskGroup(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('personal_task_group_id', res.id);
            this.router.navigateByUrl('/home/tasks/view-task-group');
            this.dismissButton.nativeElement.click();
          }

          this.isTaskGroupSaving = false;
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isTaskGroupSaving = false;
          console.log(err);
        }
      })
  }

  getNewTaskGroupCodeConfig(){
    this.taskGroupForm.controls.taskGroupCode.disable();

    this.tasksApi.getNewTaskGroupCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code)
            this.taskGroupForm.controls.taskGroupCode.setValue(res.code);
          else
            this.taskGroupForm.controls.taskGroupCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
