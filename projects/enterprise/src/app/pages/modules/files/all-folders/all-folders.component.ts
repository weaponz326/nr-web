import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { NewFolderComponent } from '../new-folder/new-folder.component';

import { FilesApiService } from 'projects/enterprise/src/app/services/modules-api/files-api/files-api.service';


@Component({
  selector: 'app-all-folders',
  templateUrl: './all-folders.component.html',
  styleUrls: ['./all-folders.component.scss']
})
export class AllFoldersComponent implements OnInit {

  constructor(
    private router: Router,
    private filesApi: FilesApiService,
  ) { }

  @ViewChild('newFolderComponentReference', { read: NewFolderComponent, static: false }) newFolder!: NewFolderComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Folders", url: "/home/files/all-folders" },
  ];

  foldersGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountFolder(1,20, "");
  }

  getAccountFolder(page: any, size: any, sortField: any){
    this.isFetchingGridData =  true;

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
          this.connectionToast.openToast();
          this.isFetchingGridData = false;
          console.log(err);
        }
      })
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountFolder(1, 20, column);

    this.currentSortColumn = column;
  }

  viewFolder(folderId: any){
    console.log(folderId);

    sessionStorage.setItem("enterprise_folder_id", folderId);
    this.router.navigateByUrl("/home/files/view-folder");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.FolderPrint.printAllFolder();
  }

}
