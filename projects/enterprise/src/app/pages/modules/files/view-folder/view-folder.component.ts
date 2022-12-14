import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-view-folder',
  templateUrl: './view-folder.component.html',
  styleUrls: ['./view-folder.component.scss']
})
export class ViewFolderComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  @ViewChild('deleteButtonElementReference', { read: ElementRef, static: false }) deleteButtonElement!: ElementRef;

  navHeading: any[] = [
    { text: "All Folders", url: "/home/files/all-folder" },
    { text: "View Folder", url: "/home/files/view-folder" },
  ];

  folderFormData: any;

  ioe = 0;

  isFolderLoading: boolean = false;
  isFolderSaving: boolean = false;
  isFolderDeleting: boolean = false;

  folderForm = new FormGroup({
    folderNumber: new FormControl(''),
    folderName: new FormControl(''),
    dateCreated: new FormControl({ value: '', disabled: true }),
    lastUpdated: new FormControl({ value: '', disabled: true }),
  })

  ngOnInit(): void {
    this.getFolder();
  }

  getFolder(){
    this.isFolderLoading = true;


  }

  updateFolder(){
    let data = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      folder_number: this.folderForm.controls.folderNumber.value as string,
      folder_name: this.folderForm.controls.folderName.value as string,
    }

    console.log(data);
    this.isFolderSaving = true;


  }

  confirmDelete(){
    this.deleteButtonElement.nativeElement.click();
  }

  deleteFolder(){
    this.isFolderDeleting = true;
    console.log('deleting...');


  }

  getIoe(e: any){
    this.ioe = e;
  }

  onPrint(){
    console.log("lets start printing...");
    // this.folderPrint.printViewFolder();
  }

}
