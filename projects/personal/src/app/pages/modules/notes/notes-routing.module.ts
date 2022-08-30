import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesPage } from './notes.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteBoardComponent } from './note-board/note-board.component';


const routes: Routes = [
  {
    path: "",
    component: NotesPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "note-board", component: NoteBoardComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
