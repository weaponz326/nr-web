import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NotesRoutingModule } from './notes-routing.module';
import { MainNavbarModule } from '../../../components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from '../../../components/module-utilities/module-utilities.module';

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
    FormsModule,
    ReactiveFormsModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
