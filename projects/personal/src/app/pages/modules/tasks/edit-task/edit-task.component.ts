import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';

import { TasksApiService } from 'projects/personal/src/app/services/modules-api/tasks-api/tasks-api.service';
import { TaskItem } from 'projects/personal/src/app/models/modules/tasks/tasks.model';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private tasksApi: TasksApiService) { }

  @Output() reloadTasksEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('taskFormComponentReference', { read: TaskFormComponent, static: false }) taskForm!: TaskFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;

  taskFormData: any;

  isTaskItemSaving = false;
  isTaskItemDeleting = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.editButton.nativeElement.click();

    this.taskFormData = data;

    this.taskForm.taskForm.controls.taskItem.setValue(this.taskFormData.task_item);
    this.taskForm.taskForm.controls.description.setValue(this.taskFormData.description);
    this.taskForm.taskForm.controls.priority.setValue(this.taskFormData.priority);
    this.taskForm.taskForm.controls.status.setValue(this.taskFormData.status);
  }

  saveTask(){
    let data: TaskItem = {
      task_group: sessionStorage.getItem('personal_task_group_id') as string,
      task_item: this.taskForm.taskForm.controls.taskItem.value as string,
      description: this.taskForm.taskForm.controls.description.value as string,
      priority: this.taskForm.taskForm.controls.priority.value as string,
      status: this.taskForm.taskForm.controls.status.value as string,
    }

    console.log(data);
    
    this.isTaskItemSaving = true;

    this.tasksApi.putTaskItem(data, this.taskFormData.id)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('personal_note_id', res.id);
            this.reloadTasksEvent.emit();
            this.dismissButton.nativeElement.click();
          }

          this.isTaskItemSaving = false;
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isTaskItemSaving = false;
          console.log(err);
        }
      })
  }

  deleteTaskItem(){
    this.isTaskItemDeleting = true;

    this.tasksApi.deleteTaskItem(this.taskFormData.id)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.reloadTasksEvent.emit();
          this.dismissButton.nativeElement.click();
          this.isTaskItemDeleting = false;
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isTaskItemDeleting = false;
          console.log(err);
        }
      })
  }

}
