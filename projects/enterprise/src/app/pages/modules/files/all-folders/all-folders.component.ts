import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { NewFolderComponent } from '../new-folder/new-folder.component';


@Component({
  selector: 'app-all-folders',
  templateUrl: './all-folders.component.html',
  styleUrls: ['./all-folders.component.scss']
})
export class AllFoldersComponent implements OnInit {

  constructor(
    private router: Router,
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
