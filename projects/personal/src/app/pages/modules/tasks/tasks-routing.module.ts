import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksPage } from './tasks.page';
import { ViewTaskGroupComponent } from './view-task-group/view-task-group.component';
import { AllTaskGroupsComponent } from './all-task-groups/all-task-groups.component';
import { AllTaskItemsComponent } from './all-task-items/all-task-items.component';
import { ChecklistViewComponent } from './checklist-view/checklist-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KanbanViewComponent } from './kanban-view/kanban-view.component';
import { ConfigurationComponent } from './configuration/configuration.component';

import { ViewTaskGroupGuard } from '../../../guards/modules/tasks/view-task-group/view-task-group.guard';


const routes: Routes = [
  {
    path: "",
    component: TasksPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-task-groups", component: AllTaskGroupsComponent },
      {
        path: "view-task-group",
        component: ViewTaskGroupComponent,
        canActivate: [ViewTaskGroupGuard],
        children: [
          { path: "", component: KanbanViewComponent },
          { path: "kanban-view", component: KanbanViewComponent },
          { path: "checklist-view", component: ChecklistViewComponent },
        ]
      },
      { path: "all-task-items", component: AllTaskItemsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
