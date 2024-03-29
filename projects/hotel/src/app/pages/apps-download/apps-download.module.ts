import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsDownloadRoutingModule } from './apps-download-routing.module';
import { AppsDownloadPage } from './apps-download.page';


@NgModule({
  declarations: [
    AppsDownloadPage
  ],
  imports: [
    CommonModule,
    AppsDownloadRoutingModule
  ]
})
export class AppsDownloadModule { }
