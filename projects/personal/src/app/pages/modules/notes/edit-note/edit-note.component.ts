import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { NotesApiService } from 'projects/personal/src/app/services/modules-api/notes-api/notes-api.service';

import { Note } from 'projects/personal/src/app/models/modules/notes/notes.model';


@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private notesApi: NotesApiService
  ) { }

  @Output() reloadEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;

  noteData: any;

  isNoteSaving = false;
  isNoteDeleting = false;

  noteForm = new FormGroup({
    noteCode: new FormControl({value: '', disabled: true}),
    title: new FormControl(''),
    body: new FormControl('')
  })

  ngOnInit(): void {
  }

  openModal(data: any){
    this.editButton.nativeElement.click();
    this.noteData = data;

    console.log(data);

    this.noteForm.controls.noteCode.setValue(data.note_code);
    this.noteForm.controls.title.setValue(data.title);
    this.noteForm.controls.body.setValue(data.body);
  }

  updateNote(){
    let data: Note = {
      user: this.customCookie.getCookie('personal_id') as string,
      note_code: this.noteForm.controls.noteCode.value as string,
      title: this.noteForm.controls.title.value as string,
      body: this.noteForm.controls.body.value as string,
    }

    console.log(data);

    this.isNoteSaving = true;

    this.notesApi.putNote(data, this.noteData.id)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('personal_note_id', res.id);
            this.reloadEvent.emit();
            this.dismissButton.nativeElement.click();
          }

          this.isNoteSaving = false;
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isNoteSaving = false;
          console.log(err);
        }
      })
  }

  deleteNote(){
    this.isNoteDeleting = true;

    this.notesApi.deleteNote(this.noteData.id)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.reloadEvent.emit();
          this.dismissButton.nativeElement.click();
          this.isNoteDeleting = false;
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isNoteDeleting = false;
          console.log(err);
        }
      })
  }

}
