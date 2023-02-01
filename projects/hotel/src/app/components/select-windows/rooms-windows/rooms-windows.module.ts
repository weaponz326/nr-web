import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectRoomComponent } from './select-room/select-room.component';



@NgModule({
  declarations: [
    SelectRoomComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectRoomComponent
  ]
})
export class RoomsWindowsModule { }
