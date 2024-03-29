import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from '../../../components/module-utilities/module-utilities.module';

import { TasksPage } from './tasks.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllTaskGroupsComponent } from './all-task-groups/all-task-groups.component';
import { NewTaskGroupComponent } from './new-task-group/new-task-group.component';
import { ViewTaskGroupComponent } from './view-task-group/view-task-group.component';
import { KanbanViewComponent } from './kanban-view/kanban-view.component';
import { ChecklistViewComponent } from './checklist-view/checklist-view.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { AllTaskItemsComponent } from './all-task-items/all-task-items.component';
import { ConfigurationComponent } from './configuration/configuration.component';


@NgModule({
  declarations: [
    TasksPage,
    DashboardComponent,
    AllTaskGroupsComponent,
    NewTaskGroupComponent,
    ViewTaskGroupComponent,
    KanbanViewComponent,
    ChecklistViewComponent,
    AddTaskComponent,
    EditTaskComponent,
    TaskFormComponent,
    AllTaskItemsComponent,
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
