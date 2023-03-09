import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { TaskFormComponent } from '../task-form/task-form.component';

import { TasksApiService } from 'projects/personal/src/app/services/modules-api/tasks-api/tasks-api.service';
import { TaskItem } from 'projects/personal/src/app/models/modules/tasks/tasks.model';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(private tasksApi: TasksApiService) { }

  @Output() reloadTasksEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('taskFormComponentReference', { read: TaskFormComponent, static: false }) taskForm!: TaskFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isTaskSaving = false;

  ngOnInit(): void {
  }

  openModal(){
    this.addButton.nativeElement.click();

    this.taskForm.taskForm.controls.priority.setValue("Mid priority");
    this.taskForm.taskForm.controls.status.setValue("To Do");

    this.getNewTaskItemCodeConfig();
  }

  postTask(){
    let data: TaskItem = {
      task_group: sessionStorage.getItem('personal_task_group_id') as string,
      task_item_code: this.taskForm.taskForm.controls.taskItemCode.value as string,
      task_item: this.taskForm.taskForm.controls.taskItem.value as string,
      description: this.taskForm.taskForm.controls.description.value as string,
      priority: this.taskForm.taskForm.controls.priority.value as string,
      status: this.taskForm.taskForm.controls.status.value as string,
    }

    console.log(data);

    this.isTaskSaving = true;

    this.tasksApi.postTaskItem(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('personal_task_item_id', res.id);
            this.reloadTasksEvent.emit();
            this.dismissButton.nativeElement.click();
            this.resetForm();
          }

          this.isTaskSaving = false;
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isTaskSaving = false;
          console.log(err);
        }
      })

    this.reloadTasksEvent.emit();
  }

  resetForm(){
    this.taskForm.taskForm.controls.taskItemCode.setValue('');
    this.taskForm.taskForm.controls.taskItem.setValue('');
    this.taskForm.taskForm.controls.description.setValue('');
    this.taskForm.taskForm.controls.priority.setValue('');
    this.taskForm.taskForm.controls.status.setValue('');
  }

  getNewTaskItemCodeConfig(){
    this.tasksApi.getNewTaskItemCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code){
            this.taskForm.taskForm.controls.taskItemCode.disable();
            this.taskForm.taskForm.controls.taskItemCode.setValue(res.code);
          }
          else{
            this.taskForm.taskForm.controls.taskItemCode.enable();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
