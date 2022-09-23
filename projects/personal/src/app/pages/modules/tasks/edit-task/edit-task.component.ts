import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskItem } from 'projects/personal/src/app/models/modules/tasks/tasks.model';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor() { }

  @Output() saveTaskEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('taskFormComponentReference', { read: TaskFormComponent, static: false }) taskForm!: TaskFormComponent;

  taskFormData: any;

  isSaving = false;
  isDeleting = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.editButton.nativeElement.click();

    this.taskFormData = data;

    this.taskForm.taskForm.controls.taskItem.setValue(this.taskFormData.task_item);
    this.taskForm.taskForm.controls.description.setValue(this.taskFormData.description);
    this.taskForm.taskForm.controls.priority.setValue(this.taskFormData.priority);
    this.taskForm.taskForm.controls.startDate.setValue(new Date(this.taskFormData.start_date).toISOString().slice(0, 16));
    this.taskForm.taskForm.controls.endDate.setValue(new Date(this.taskFormData.end_date).toISOString().slice(0, 16));
    this.taskForm.taskForm.controls.status.setValue(this.taskFormData.status);
  }

  saveTask(){
    let data: TaskItem = {
      task_group: sessionStorage.getItem('personal_task_group_id') as string,
      task_item: this.taskForm.taskForm.controls.taskItem.value as string,
      description: this.taskForm.taskForm.controls.description.value as string,
      priority: this.taskForm.taskForm.controls.priority.value as string,
      start_date: this.taskForm.taskForm.controls.startDate.value,
      end_date: this.taskForm.taskForm.controls.startDate.value,
      status: this.taskForm.taskForm.controls.status.value as string,
    }

    let task = {
      id: this.taskFormData.id,
      data: data
    }

    this.saveTaskEvent.emit(task);
  }

}
