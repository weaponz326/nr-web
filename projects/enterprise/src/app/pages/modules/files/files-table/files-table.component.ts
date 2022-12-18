import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';

import { AddFileComponent } from '../add-file/add-file.component';
import { EditFileComponent } from '../edit-file/edit-file.component';

import { FilesApiService } from 'projects/enterprise/src/app/services/modules-api/files-api/files-api.service';


@Component({
  selector: 'app-files-table',
  templateUrl: './files-table.component.html',
  styleUrls: ['./files-table.component.scss']
})
export class FilesTableComponent implements OnInit {

  constructor(
    private filesApi: FilesApiService
  ) { }

  @Output() balanceEvent = new EventEmitter<any>();

  @ViewChild('addFileComponentReference', { read: AddFileComponent, static: false }) addFile!: AddFileComponent;
  @ViewChild('editFileComponentReference', { read: EditFileComponent, static: false }) editFile!: EditFileComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;

  filesGridData: any[] = [];

  deleteId = "";
  balance = 0;

  isDataAvailable: boolean =  true;
  isFetchingGridData = false;
  isFileDeleting = false;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getFolderFiles(1,20, "");
  }

  getFolderFiles(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.filesApi.getFolderFiles(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.filesGridData = res.results;
          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;

          this.isFetchingGridData = false;
          if(this.totalItems == 0)
            this.isDataAvailable = false
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  sortTable(column: any){
    console.log(column);
    this.getFolderFiles(1, 20, column);

    this.currentSortColumn = column;
  }

  createFile(data: any){
    console.log(data);
    this.addFile.isSaving = true;

    this.filesApi.postFile(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.addFile.isSaving = false;
          this.addFile.dismissButton.nativeElement.click();
          this.addFile.resetForm();
          this.getFolderFiles(1,20, "");
        },
        error: (err) => {
          console.log(err);
          this.addFile.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateFile(file: any){
    console.log(file);
    this.editFile.isSaving = true;

    this.filesApi.putFile(file.data, file.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editFile.dismissButton.nativeElement.click();
          this.editFile.isSaving = false;
          this.getFolderFiles(1,20, "");
        },
        error: (err) => {
          console.log(err);
          this.editFile.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  deleteFile(){
    console.log(this.deleteId);
    this.isFileDeleting = true;

    this.filesApi.deleteFile(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
        this.isFileDeleting = false;
        this.getFolderFiles(1,20, "");
        },
        error: (err) => {
          console.log(err);
          this.isFileDeleting = false;
          this.connectionToast.openToast();
        }
      })
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
