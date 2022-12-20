import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectFolderComponent } from './select-folder/select-folder.component';
import { SelectFileComponent } from './select-file/select-file.component';



@NgModule({
  declarations: [
    SelectFolderComponent,
    SelectFileComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ]
})
export class FilesWindowsModule { }
