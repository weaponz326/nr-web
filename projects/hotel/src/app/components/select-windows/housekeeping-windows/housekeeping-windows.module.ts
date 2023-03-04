import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectHousekeepingComponent } from './select-housekeeping/select-housekeeping.component';



@NgModule({
  declarations: [
    SelectHousekeepingComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectHousekeepingComponent
  ]
})
export class HousekeepingWindowsModule { }
