import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { FileFormComponent } from '../file-form/file-form.component';


@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.scss']
})
export class EditFileComponent implements OnInit {

  constructor() { }

  @Output() saveFileEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('fileFormComponentReference', { read: FileFormComponent, static: false }) fileForm!: FileFormComponent;

  fileFormData: any;

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.fileFormData = data;

    this.fileForm.fileForm.controls.fileNumber.setValue(this.fileFormData.file_number);
    this.fileForm.fileForm.controls.fileName.setValue(this.fileFormData.file_name);
    this.fileForm.fileForm.controls.fileType.setValue(this.fileFormData.file_type);
    this.fileForm.fileForm.controls.dateAdded.setValue(new Date(this.fileFormData.date_added).toISOString().slice(0, 16));

    this.editButton.nativeElement.click();
  }

  saveFile(){
    let data = {
      file_number: this.fileForm.fileForm.controls.fileNumber.value as string,
      file_name: this.fileForm.fileForm.controls.fileName.value as string,
      file_type: this.fileForm.fileForm.controls.fileType.value as string,
      date_added: this.fileForm.fileForm.controls.dateAdded.value,
      account: sessionStorage.getItem('enterprise_folder_id') as string,
    }

    let file = {
      id: this.fileFormData.id,
      data: data
    }

    this.saveFileEvent.emit(file);
  }

}
