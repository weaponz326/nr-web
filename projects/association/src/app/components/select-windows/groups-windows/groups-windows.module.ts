import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectGroupComponent } from './select-group/select-group.component';



@NgModule({
  declarations: [
    SelectGroupComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectGroupComponent
  ]
})
export class GroupsWindowsModule { }
