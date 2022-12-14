import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { FileFormComponent } from '../file-form/file-form.component';


@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {

  constructor() { }

  @Output() saveFileEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('fileFormComponentReference', { read: FileFormComponent, static: false }) fileForm!: FileFormComponent;

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(){
    this.fileForm.fileForm.controls.dateAdded.setValue(new Date().toISOString().slice(0, 16));

    this.addButton.nativeElement.click();
  }

  saveFile(){
    // let data: File = {
    let data = {
      file_number: this.fileForm.fileForm.controls.fileNumber.value as string,
      file_name: this.fileForm.fileForm.controls.fileName.value as string,
      file_type: this.fileForm.fileForm.controls.fileType.value as string,
      date_added: this.fileForm.fileForm.controls.dateAdded.value,
      account: sessionStorage.getItem('enterprise_folder_id') as string,
    }

    this.saveFileEvent.emit(data);
  }

  resetForm(){
    this.fileForm.fileForm.controls.fileNumber.setValue('');
    this.fileForm.fileForm.controls.fileName.setValue('');
    this.fileForm.fileForm.controls.fileType.setValue('');
    this.fileForm.fileForm.controls.dateAdded.setValue(new Date().toISOString().slice(0, 16));
  }
  
}
