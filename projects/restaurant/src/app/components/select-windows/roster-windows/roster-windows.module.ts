import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectRosterComponent } from './select-roster/select-roster.component';
import { SelectShiftComponent } from './select-shift/select-shift.component';



@NgModule({
  declarations: [
    SelectRosterComponent,
    SelectShiftComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectRosterComponent,
    SelectShiftComponent
  ]
})
export class RosterWindowsModule { }
