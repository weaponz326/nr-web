import { Component, OnInit, ViewChild } from '@angular/core';

import { AddTaskComponent } from '../add-task/add-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';


@Component({
  selector: 'app-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrls: ['./kanban-view.component.scss']
})
export class KanbanViewComponent implements OnInit {

  constructor() { }

  @ViewChild('addTaskComponentReference', { read: AddTaskComponent, static: false }) addTask!: AddTaskComponent;
  @ViewChild('editTaskComponentReference', { read: EditTaskComponent, static: false }) editTask!: EditTaskComponent;

  ngOnInit(): void {
  }

}
