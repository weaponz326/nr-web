import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectFolderComponent } from './select-folder/select-folder.component';
import { SelectFileComponent } from './select-file/select-file.component';



@NgModule({
  declarations: [
    SelectFolderComponent,
    SelectFileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FilesWindowsModule { }
