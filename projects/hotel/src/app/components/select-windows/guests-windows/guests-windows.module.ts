import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectGuestComponent } from './select-guest/select-guest.component';



@NgModule({
  declarations: [
    SelectGuestComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectGuestComponent
  ]
})
export class GuestsWindowsModule { }
