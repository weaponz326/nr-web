import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectMeetingComponent } from './select-meeting/select-meeting.component';



@NgModule({
  declarations: [
    SelectMeetingComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectMeetingComponent
  ]
})
export class MeetingsWindowsModule { }
