import { Component, OnInit, ViewChild } from '@angular/core';

import { EditNoteComponent } from '../edit-note/edit-note.component';
import { NewNoteComponent } from '../new-note/new-note.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { NotesApiService } from 'projects/personal/src/app/services/modules-api/notes-api/notes-api.service';
import { NotesPrintService } from 'projects/personal/src/app/services/printing/notes-print/notes-print.service';
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss']
})
export class NoteBoardComponent implements OnInit {

  constructor(
    private notesApi: NotesApiService,
    private notesPrint: NotesPrintService,
  ) { }

  navHeading: any[] = [
    { text: "Note Board", url: "/home/notes/note-board" },
  ];

  @ViewChild('newNoteComponentReference', { read: NewNoteComponent, static: false }) newNote!: NewNoteComponent;
  @ViewChild('editNoteComponentReference', { read: EditNoteComponent, static: false }) editNote!: EditNoteComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  noteBoardData: any[] = [];

  isFetchingBoardData: boolean =  true;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  deleteIndex: any;
  isNoteDeleting = false;

  searchValue = "";

  ngOnInit(): void {
    this.getUserNotes(1, 8, "");
  }

  getUserNotes(page: any, size: any, sortField: any){
    this.isFetchingBoardData =  true;

    this.notesApi.getUserNotes(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.noteBoardData = res.results;
          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;

          this.isFetchingBoardData = false;
          if(this.totalItems == 0)
            this.isDataAvailable = false
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isFetchingBoardData = false;
          console.log(err);
        }
      })
  }

  deleteNote(){
    this.isNoteDeleting = true;

    this.notesApi.deleteNote(this.deleteIndex)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getUserNotes(1, 8, '');
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isNoteDeleting = false;
          console.log(err);
        }
      })
  }

  openEditModal(index: any){
    this.editNote.openModal(this.noteBoardData[index])
  }

  openDeleteConfirm(index: any){
    this.deleteIndex = index;
    this.deleteModal.openModal();
  }

  getSearch(){
    console.log(this.searchValue);

    this.notesApi.getSearch(this.searchValue)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.noteBoardData = res;
          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;
        },
        error: (err) => {
          this.connectionToast.openToast();
          console.log(err);
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.notePrint.printAllNotes();
  }

}
