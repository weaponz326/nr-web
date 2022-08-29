import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppsDownloadPage } from './apps-download.page';

const routes: Routes = [
  { path: "", component: AppsDownloadPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsDownloadRoutingModule { }
