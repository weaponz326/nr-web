import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { FilesApiService } from 'projects/enterprise/src/app/services/modules-api/files-api/files-api.service';

import { Folder } from 'projects/enterprise/src/app/models/modules/files/files.model';


@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private filesApi: FilesApiService,
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isSavingFolder = false;

  folderForm = new FormGroup({
    folderNumber: new FormControl(''),
    folderName: new FormControl(''),
  })

  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
  }

  createFolder(){
    this.isSavingFolder = true;

    let data: Folder = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      folder_number: this.folderForm.controls.folderNumber.value as string,
      folder_name: this.folderForm.controls.folderName.value as string,
    }

    console.log(data);

    this.filesApi.postFolder(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('enterprise_folder_id', res.id);
            this.router.navigateByUrl('/home/files/view-folder');
            this.dismissButton.nativeElement.click();
          }

          this.isSavingFolder = false;
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isSavingFolder = false;
          console.log(err);
        }
      })
  }

}
