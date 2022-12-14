import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';

import { AddFileComponent } from '../add-file/add-file.component';
import { EditFileComponent } from '../edit-file/edit-file.component';


@Component({
  selector: 'app-files-table',
  templateUrl: './files-table.component.html',
  styleUrls: ['./files-table.component.scss']
})
export class FilesTableComponent implements OnInit {

  constructor(
    // private foldersApi: FoldersApiService
  ) { }

  @Output() balanceEvent = new EventEmitter<any>();

  @ViewChild('addFileComponentReference', { read: AddFileComponent, static: false }) addFile!: AddFileComponent;
  @ViewChild('editFileComponentReference', { read: EditFileComponent, static: false }) editFile!: EditFileComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;

  filesGridData: any[] = [];

  deleteId = "";
  balance = 0;

  isFetchingGridData = false;
  isFileDeleting = false;

  ngOnInit(): void {
    this.getFolderFile();
  }

  getFolderFile(){
    this.isFetchingGridData = true;


  }

  createFile(data: any){
    console.log(data);
    this.addFile.isSaving = true;


  }

  updateFile(file: any){
    console.log(file);
    this.editFile.isSaving = true;


  }

  deleteFile(){
    console.log(this.deleteId);
    this.isFileDeleting = true;


  }

  openEditFile(data: any){
    console.log(data);
    this.editFile.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
