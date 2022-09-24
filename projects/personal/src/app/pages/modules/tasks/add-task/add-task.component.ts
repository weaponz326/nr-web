import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskItem } from 'projects/personal/src/app/models/modules/tasks/tasks.model';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor() { }

  @Output() saveTaskEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('taskFormComponentReference', { read: TaskFormComponent, static: false }) taskForm!: TaskFormComponent;

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(){
    this.addButton.nativeElement.click();
  }

  saveTask(){
    let data: TaskItem = {
      task_group: sessionStorage.getItem('personal_task_group_id') as string,
      task_item: this.taskForm.taskForm.controls.taskItem.value as string,
      description: this.taskForm.taskForm.controls.description.value as string,
      priority: this.taskForm.taskForm.controls.priority.value as string,
      status: this.taskForm.taskForm.controls.status.value as string,
    }

    this.saveTaskEvent.emit(data);
  }

  resetForm(){
    this.taskForm.taskForm.controls.taskItem.setValue('');
    this.taskForm.taskForm.controls.description.setValue('');
    this.taskForm.taskForm.controls.priority.setValue('');
    this.taskForm.taskForm.controls.status.setValue('');
  }

}
