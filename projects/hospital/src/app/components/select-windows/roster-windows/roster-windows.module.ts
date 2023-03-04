import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectRosterComponent } from './select-roster/select-roster.component';



@NgModule({
  declarations: [
    SelectRosterComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectRosterComponent
  ]
})
export class RosterWindowsModule { }
