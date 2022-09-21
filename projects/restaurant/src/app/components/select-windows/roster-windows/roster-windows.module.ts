import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectRosterComponent } from './select-roster/select-roster.component';
import { SelectShiftComponent } from './select-shift/select-shift.component';
import { SelectBatchComponent } from './select-batch/select-batch.component';



@NgModule({
  declarations: [
    SelectRosterComponent,
    SelectShiftComponent,
    SelectBatchComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectRosterComponent,
    SelectShiftComponent,
    SelectBatchComponent
  ]
})
export class RosterWindowsModule { }
