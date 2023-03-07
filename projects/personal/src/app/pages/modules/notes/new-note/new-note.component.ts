import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { NotesApiService } from 'projects/personal/src/app/services/modules-api/notes-api/notes-api.service';

import { Note } from 'projects/personal/src/app/models/modules/notes/notes.model';


@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private notesApi: NotesApiService
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  @Output() reloadEvent = new EventEmitter<any>();

  isNoteSaving = false;

  noteForm = new FormGroup({
    noteCode: new FormControl(''),
    title: new FormControl(''),
    body: new FormControl('')
  })

  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
  }

  createNote(){
    let data: Note = {
      user: this.customCookie.getCookie('personal_id') as string,
      note_code: this.noteForm.controls.noteCode.value as string,
      title: this.noteForm.controls.title.value as string,
      body: this.noteForm.controls.body.value as string,
    }

    console.log(data);

    this.isNoteSaving = true;

    this.notesApi.postNote(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('personal_note_id', res.id);
            this.reloadEvent.emit();
            this.dismissButton.nativeElement.click();
            this.resetForm();
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

  resetForm(){
    this.noteForm.controls.noteCode.setValue('');
    this.noteForm.controls.title.setValue('');
    this.noteForm.controls.body.setValue('');
  }
  
  getNewNoteCodeConfig(){
    this.noteForm.controls.noteCode.disable();

    this.notesApi.getNewNoteCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code)
            this.noteForm.controls.noteCode.setValue(res.code);
          else
            this.noteForm.controls.noteCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
  
}
