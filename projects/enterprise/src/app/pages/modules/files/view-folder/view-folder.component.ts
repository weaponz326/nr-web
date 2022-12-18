import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { FilesApiService } from 'projects/enterprise/src/app/services/modules-api/files-api/files-api.service';

import { Folder } from 'projects/enterprise/src/app/models/modules/files/files.model';


@Component({
  selector: 'app-view-folder',
  templateUrl: './view-folder.component.html',
  styleUrls: ['./view-folder.component.scss']
})
export class ViewFolderComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private filesApi: FilesApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  @ViewChild('deleteButtonElementReference', { read: ElementRef, static: false }) deleteButtonElement!: ElementRef;

  navHeading: any[] = [
    { text: "All Folders", url: "/home/files/all-folders" },
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

    this.filesApi.getFolder()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.folderFormData = res;
          this.folderForm.controls.folderNumber.setValue(this.folderFormData.folder_number);
          this.folderForm.controls.folderName.setValue(this.folderFormData.folder_name);
          this.folderForm.controls.dateCreated.setValue(new Date(this.folderFormData.created_at).toISOString().slice(0, 10));
          this.folderForm.controls.lastUpdated.setValue(new Date(this.folderFormData.updated_at).toISOString().slice(0, 10));

          this.isFolderLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isFolderLoading = false;
          this.connectionToast.openToast();
        }
    })
  }

  updateFolder(){
    let data: Folder = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      folder_number: this.folderForm.controls.folderNumber.value as string,
      folder_name: this.folderForm.controls.folderName.value as string,
    }

    console.log(data);
    this.isFolderSaving = true;

    this.filesApi.putFolder(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isFolderSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFolderSaving = false;
        }
    })
  }

  confirmDelete(){
    this.deleteButtonElement.nativeElement.click();
  }

  deleteFolder(){
    this.isFolderDeleting = true;
    console.log('deleting...');

    this.filesApi.deleteFolder()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/files/all-folder');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFolderDeleting = false;
        }
      })
  }

  getIoe(e: any){
    this.ioe = e;
  }

  onPrint(){
    console.log("lets start printing...");
    // this.folderPrint.printViewFolder();
  }

}
