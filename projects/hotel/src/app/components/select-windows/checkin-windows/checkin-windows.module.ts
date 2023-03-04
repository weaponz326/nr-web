import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectCheckinComponent } from './select-checkin/select-checkin.component';



@NgModule({
  declarations: [
    SelectCheckinComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectCheckinComponent
  ]
})
export class CheckinWindowsModule { }
