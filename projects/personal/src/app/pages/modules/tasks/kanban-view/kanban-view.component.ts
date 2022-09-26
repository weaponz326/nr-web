import { Component, OnInit, ViewChild } from '@angular/core';

import { AddTaskComponent } from '../add-task/add-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';

import { TasksApiService } from 'projects/personal/src/app/services/modules-api/tasks-api/tasks-api.service';


@Component({
  selector: 'app-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrls: ['./kanban-view.component.scss']
})
export class KanbanViewComponent implements OnInit {

  constructor(private tasksApi: TasksApiService) { }

  @ViewChild('addTaskComponentReference', { read: AddTaskComponent, static: false }) addTask!: AddTaskComponent;
  @ViewChild('editTaskComponentReference', { read: EditTaskComponent, static: false }) editTask!: EditTaskComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  tasksData: any;
  isFetchingTasksData = false;
  isTaskDeleting = false;

  deleteIndex: any;
  
  ngOnInit(): void {
    this.getTaskGroupTaskItems();
  }

  getTaskGroupTaskItems(){
    this.isFetchingTasksData =  true;

    this.tasksApi.getTaskGroupTaskItems()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.tasksData = res;
          this.isFetchingTasksData = false;
        },
        error: (err) => {
          console.log(err);

          this.connectionToast.openToast();
          this.isFetchingTasksData = false;
        }
      })
  }

  deleteTaskItem(){
    this.isTaskDeleting = true;

    this.tasksApi.deleteTaskItem(this.tasksData[this.deleteIndex].id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getTaskGroupTaskItems();
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isTaskDeleting = false;
          console.log(err);
        }
      })
  }

  openEditModal(index: any){
    this.editTask.openModal(this.tasksData[index])
  }

  openDeleteConfirm(index: any){
    this.deleteIndex = index;
    this.deleteModal.openModal();
  }

}
