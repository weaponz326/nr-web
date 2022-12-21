import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilesRoutingModule } from './files-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { FilesPage } from './files.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllFoldersComponent } from './all-folders/all-folders.component';
import { NewFolderComponent } from './new-folder/new-folder.component';
import { ViewFolderComponent } from './view-folder/view-folder.component';
import { FilesTableComponent } from './files-table/files-table.component';
import { AddFileComponent } from './add-file/add-file.component';
import { EditFileComponent } from './edit-file/edit-file.component';
import { FileFormComponent } from './file-form/file-form.component';


@NgModule({
  declarations: [
    FilesPage,
    DashboardComponent,
    ConfigurationComponent,
    AllFoldersComponent,
    NewFolderComponent,
    ViewFolderComponent,
    FilesTableComponent,
    AddFileComponent,
    EditFileComponent,
    FileFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilesRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class FilesModule { }
