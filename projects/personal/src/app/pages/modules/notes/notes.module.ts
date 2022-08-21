import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesPage } from './notes.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllNotesComponent } from './all-notes/all-notes.component';
import { NewNoteComponent } from './new-note/new-note.component';
import { ViewNoteComponent } from './view-note/view-note.component';


@NgModule({
  declarations: [
    NotesPage,
    DashboardComponent,
    AllNotesComponent,
    NewNoteComponent,
    ViewNoteComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
