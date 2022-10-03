import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NotesRoutingModule } from './notes-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from '../../../components/module-utilities/module-utilities.module';

import { NotesPage } from './notes.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewNoteComponent } from './new-note/new-note.component';
import { NoteBoardComponent } from './note-board/note-board.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { ConfigurationComponent } from './configuration/configuration.component';


@NgModule({
  declarations: [
    NotesPage,
    DashboardComponent,
    NewNoteComponent,
    NoteBoardComponent,
    NoteCardComponent,
    EditNoteComponent,
    ConfigurationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
