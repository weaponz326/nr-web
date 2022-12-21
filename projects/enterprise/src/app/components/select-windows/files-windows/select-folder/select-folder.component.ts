import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { FilesApiService } from 'projects/enterprise/src/app/services/modules-api/files-api/files-api.service';


@Component({
  selector: 'app-select-folder',
  templateUrl: './select-folder.component.html',
  styleUrls: ['./select-folder.component.scss']
})
export class SelectFolderComponent implements OnInit {

  constructor(private filesApi: FilesApiService) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  foldersGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
  }

  openModal(){
    this.foldersGridData = [];
    this.getAccountFolders(1, 20, "-created_at");
    this.openButton.nativeElement.click();
  }

  getAccountFolders(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.filesApi.getAccountFolders(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.foldersGridData = res.results;

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
    this.getAccountFolders(1, 20, column);

    this.currentSortColumn = column;
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    console.log(row);
  }

}
