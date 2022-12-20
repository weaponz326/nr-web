import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectLeaveComponent } from './select-leave/select-leave.component';



@NgModule({
  declarations: [
    SelectLeaveComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ]
})
export class LeaveWindowsModule { }
