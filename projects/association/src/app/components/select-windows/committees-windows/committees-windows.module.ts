import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectCommitteeComponent } from './select-committee/select-committee.component';



@NgModule({
  declarations: [
    SelectCommitteeComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectCommitteeComponent
  ]
})
export class CommitteesWindowsModule { }
